'use strict'

class ResetPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password: 'required|confirmed'
    }
  }
}

module.exports = ResetPassword
