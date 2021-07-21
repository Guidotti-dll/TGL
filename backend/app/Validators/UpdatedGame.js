
'use strict'

class UpdatedGame {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      type: 'string|unique:games',
      description: 'string',
      range: 'number',
      price: 'number|above:0',
      color: 'string|min:7|max:7|regex:^#([0-9a-fA-F]{6})$',
      'max-number': 'number',
      'min-cart-value': 'number'
    }
  }
}

module.exports = UpdatedGame
