'use strict'

class CreatedGame {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      type: 'required|string|unique:games',
      description: 'required|string',
      range: 'required|number',
      price: 'required|number|above:0',
      color: 'required|string|min:7|max:7|regex:^#([0-9a-fA-F]{6})$',
      'max-number': 'required|number|above:0',
      'min-cart-value': 'required|number|above:0'
    }
  }
}

module.exports = CreatedGame
