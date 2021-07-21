'use strict'

const Env = use('Env')
const User = use('App/Models/User')
const Mail = use('Mail')

const tglEmail = Env.get('MAIL_EMAIL')
const tglName = Env.get('MAIL_NAME')
const url = Env.get('APP_URL')

class UserController {
  async index () {
    const users = await User.query().paginate()
    return users
  }

  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)
    await Mail.send(
      ['emails.confirmation_account'],
      { name: user.name, link: `${url}/confirm-account/${user.id}` },
      message => {
        message.to(user.email).from(tglEmail, tglName).subject('Confirmar conta')
      }
    )

    return user
  }

  async show ({ params, response }) {
    const user = await User.findBy('id', params.id)
    if (!user) {
      return response.status(404).send({ error: { message: 'User not found' } })
    }
    return user
  }

  async update ({ params, request, response, auth }) {
    const user = await User.findBy('id', params.id)
    const data = request.only(['name', 'email', 'password'])

    if (user.id !== auth.user.id) {
      return response.status(401).send({ error: { message: 'You can only update your own account' } })
    }

    await user.merge(data)
    await user.save()
    return user
  }

  async destroy ({ params, response, auth }) {
    const user = await User.findBy('id', params.id)
    if (user.id !== auth.user.id) {
      return response.status(401).send({ error: { message: 'You can only delete your own account' } })
    }
    await user.delete()
    return response.status(200).send({ deleted: true })
  }
}

module.exports = UserController
