'use strict'

const User = use('App/Models/User')
// const Env = use('Env')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const user = await User.findBy('email', email)

    if (user && !user.is_confirmed) {
      return response.status(401).send({ error: { message: 'Unconfirmed account, check your email' } })
    }

    try {
      const token = await auth.attempt(email, password)
      return { token, user }
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Invalid email or password' } })
    }
  }

  async confirmAccount ({ params, response }) {
    const user = await User.findBy('id', params.id)
    if (!user) {
      return response.status(404).send({ error: { message: 'User not found' } })
    }
    if (user && user.is_confirmed) {
      return response.status(400).send({ error: { message: 'This account is already confirmed' } })
    }

    user.is_confirmed = true
    user.save()

    // if (Env.get('NODE_ENV') === 'development') {
    //   return response.status(200).send({ account: 'Confirmed' })
    // }else {
    //   return response.status(200).redirect('http://localhost:3000?confirm=true')
    // }
    return response.status(200).redirect('http://localhost:3000?confirm=true')
  }
}

module.exports = SessionController
