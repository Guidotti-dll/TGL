'use strict'
const Env = use('Env')
const Mail = use('Mail')
const tglEmail = Env.get('MAIL_EMAIL')
const tglName = Env.get('MAIL_NAME')
const url = Env.get('APP_URL')

class NewUserMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewUserMail-job'
  }

  // This is where the work is done.
  async handle ({ user }) {
    console.log(`${NewUserMail.key}: start`)
    await Mail.send(
      ['emails.confirmation_account'],
      { name: user.name, link: `${url}/confirm-account/${user.id}` },
      message => {
        message.to(user.email).from(tglEmail, tglName).subject('Confirmar conta')
      }
    )
  }
}

module.exports = NewUserMail
