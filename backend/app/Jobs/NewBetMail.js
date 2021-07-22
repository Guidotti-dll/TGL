'use strict'

const Env = use('Env')
const Mail = use('Mail')
const tglEmail = Env.get('MAIL_EMAIL')
const tglName = Env.get('MAIL_NAME')

class NewBetMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewBetMail-job'
  }

  // This is where the work is done.
  async handle ({ name, email, bets }) {
    console.log(`${NewBetMail.key}: start`)
    await Mail.send(
      ['emails.add_bets'],
      { name, bets },
      message => {
        message.to(email).from(tglEmail, tglName).subject('Criação de apostas')
      }
    )
  }
}

module.exports = NewBetMail
