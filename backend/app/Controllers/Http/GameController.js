'use strict'

const Game = use('App/Models/Game')

class GameController {
  async index () {
    const games = await Game.all()
    return games
  }

  async store ({ request }) {
    const data = request.only(['type', 'description', 'range', 'price', 'color', 'max-number', 'min-cart-value'])
    const game = await Game.create(data)
    return game
  }

  async show ({ params, response }) {
    const game = await Game.findBy('id', params.id)
    if (!game) {
      return response.status(404).send({ error: { message: 'Game not found' } })
    }
    return game
  }

  async update ({ params, request, response }) {
    const game = await Game.findBy('id', params.id)
    const data = request.only(['type', 'description', 'range', 'price', 'color', 'max-number', 'min-cart-value'])

    if (!game) {
      return response.status(404).send({ error: { message: 'Game not found' } })
    }

    await game.merge(data)
    await game.save()
    return game
  }

  async destroy ({ params, response }) {
    const game = await Game.findBy('id', params.id)
    if (!game) {
      return response.status(404).send({ error: { message: 'Game not found' } })
    }
    await game.delete()
    return response.status(200).send({ deleted: true })
  }
}

module.exports = GameController
