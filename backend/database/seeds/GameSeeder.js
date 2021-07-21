'use strict'

/*
|--------------------------------------------------------------------------
| GameSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Game = use('App/Models/Game')

const defaultGames = [
  {
    type: 'Lotofácil',
    description: 'Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!',
    range: 25,
    price: 2.5,
    color: '#7F3992',
    'max-number': 15,
    'min-cart-value': 30
  },
  {
    type: 'Mega-Sena',
    description: 'Escolha 6 números dos 60 disponíveis na mega-sena. Ganhe com 6, 5 ou 4 acertos. São realizados dois sorteios semanais para você apostar e torcer para ficar milionário.',
    range: 60,
    price: 4.5,
    color: '#01AC66',
    'max-number': 6,
    'min-cart-value': 30
  },
  {
    type: 'Quina',
    description: 'Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.',
    range: 80,
    price: 2,
    color: '#F79C31',
    'max-number': 5,
    'min-cart-value': 30
  }
]

class GameSeeder {
  async run () {
    await Game.createMany(defaultGames)
  }
}

module.exports = GameSeeder
