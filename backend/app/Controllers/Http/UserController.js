'use strict'

const Env = use('Env')
const User = use('App/Models/User')
const Mail = use('Mail')

const tglEmail = Env.get('MAIL_EMAIL')
const tglName = Env.get('MAIL_NAME')
const url = Env.get('APP_URL')

class UserController {
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
}

module.exports = UserController
