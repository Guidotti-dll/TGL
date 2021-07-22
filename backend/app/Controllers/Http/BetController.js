'use strict'

const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')

const Database = use('Database')
const Kue = use('Kue')
const Job = use('App/Jobs/NewBetMail')

class BetController {
  async index ({ request, response, view }) {
    const bets = await Bet.query().with('game').paginate()

    return bets
  }

  async store ({ request, response, auth }) {
    const { bets } = request.only(['bets'])

    const betsEmail = []
    let minCartValue = 0
    let totalCartPrice = 0

    const trx = await Database.beginTransaction()

    for (const bet of bets) {
      const game = await Game.find(bet.game_id)
      if (bet.numbers.length !== game['max-number']) {
        return response.status(400).send({ error: { message: 'Some of your bets doesn\'t have the correct amount of numbers' } })
      }

      totalCartPrice += game.price

      if (minCartValue < game['min-cart-value']) {
        minCartValue = game['min-cart-value']
      }

      const data = {
        game_id: game.id,
        user_id: auth.user.id,
        price: game.price,
        numbers: bet.numbers.join(',')
      }

      const newBet = await Bet.create(data, trx)

      betsEmail.push({
        ...newBet.$attributes,
        type: game.type,
        color: game.color,
        price: newBet.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })
      })
    }

    if (totalCartPrice < minCartValue) {
      return response.status(400).send({ error: { message: 'The value of your cart is less than the minimum accepted ' } })
    }

    await trx.commit()

    Kue.dispatch(Job.key, { email: auth.user.email, name: auth.user.name, bets: betsEmail }, { attempts: 3 })

    return betsEmail
  }

  async show ({ params, response }) {
    const bet = await Bet.findBy('id', params.id)
    if (!bet) {
      return response.status(404).send({ error: { message: 'Bet not found' } })
    }
    await bet.load('game')
    return bet
  }

  async update ({ params, request, response }) {
    const data = request.only(['game_id', 'numbers'])

    const bet = await Bet.findBy('id', params.id)
    if (!bet) {
      return response.status(404).send({ error: { message: 'Bet not found' } })
    }

    const game = await Game.find(data.game_id)
    if (data.numbers.length !== game['max-number']) {
      return response.status(400).send({ error: { message: 'Your bet doesn\'t have the correct amount of numbers' } })
    }

    await bet.merge({ game_id: data.game_id, numbers: data.numbers.join(',') })
    await bet.save()
    return bet
  }

  async destroy ({ params, response }) {
    const bet = await Bet.findBy('id', params.id)
    if (!bet) {
      return response.status(404).send({ error: { message: 'Bet not found' } })
    }
    await bet.delete()
    return response.status(200).send({ deleted: true })
  }
}

module.exports = BetController
