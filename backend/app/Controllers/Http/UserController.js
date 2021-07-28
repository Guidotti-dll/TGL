'use strict'

const User = use('App/Models/User')

const Kue = use('Kue')
const Job = use('App/Jobs/NewUserMail')

class UserController {
  async index () {
    const users = await User.query().paginate()
    return users
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'email', 'password'])
    try {
      const user = await User.create(data)

      Kue.dispatch(Job.key, { user }, { attempts: 3 })

      return user
    } catch (error) {
      return response.status(error.status).send({ error: { message: error.message } })
    }
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

    if (!user) {
      return response.status(404).send({ error: { message: 'User not found' } })
    }

    if (user.id !== auth.user.id) {
      return response.status(401).send({ error: { message: 'You can only update your own account' } })
    }

    if (!data.password) {
      await delete data.password
    }

    const userTest = await User.findBy('email', data.email)

    if (userTest.id !== user.id) {
      return response.status(400).send({ error: { message: 'This email is already being used' } })
    }

    await user.merge(data)
    await user.save()
    return user
  }

  async destroy ({ params, response, auth }) {
    const user = await User.findBy('id', params.id)

    if (!user) {
      return response.status(404).send({ error: { message: 'User not found' } })
    }

    if (user.id !== auth.user.id) {
      return response.status(401).send({ error: { message: 'You can only delete your own account' } })
    }
    await user.delete()
    return response.status(200).send({ deleted: true })
  }
}

module.exports = UserController
