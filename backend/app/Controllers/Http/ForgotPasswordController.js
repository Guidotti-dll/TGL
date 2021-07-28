'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')

const Kue = use('Kue')
const Job = use('App/Jobs/ForgotPasswordMail')
class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      if (user && !user.is_confirmed) {
        return response.status(401).send({ error: { message: 'Unconfirmed account, check your email' } })
      }

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      await user.save()

      Kue.dispatch(Job.key, { redirectUrl: request.input('redirect_url'), user, email }, { attempts: 3 })
    } catch (error) {
      return response
        .status(404)
        .send({ error: { message: 'User not found' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = await request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O token de recuperação está expirado' } })
      }
      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (error) {
      return response
        .status(400)
        .send({ error: { message: 'Algo deu errado ao salvar sua nova senha' } })
    }
  }
}

module.exports = ForgotPasswordController
