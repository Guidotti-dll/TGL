'use strict'

const Env = use('Env')
const Mail = use('Mail')
const tglEmail = Env.get('MAIL_EMAIL')
const tglName = Env.get('MAIL_NAME')

class ForgotPasswordMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'ForgotPasswordMail-job'
  }

  // This is where the work is done.
  async handle ({ redirectUrl, user, email }) {
    console.log(`${ForgotPasswordMail.key}: start`)
    await Mail.send(
      ['emails.forgot_password'],
      { name: user.name, email, token: user.token, link: `${redirectUrl}?token=${user.token}` },
      message => {
        message.to(user.email).from(tglEmail, tglName).subject('Recuperação de senha')
      }
    )
  }
}

module.exports = ForgotPasswordMail
