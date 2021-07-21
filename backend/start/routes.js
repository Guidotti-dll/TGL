'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.get('users', 'UserController.index')
Route.get('users/:id', 'UserController.show')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.get('confirm-account/:id', 'SessionController.confirmAccount')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.group(() => {
  Route.patch('users/:id', 'UserController.update')
  Route.delete('users/:id', 'UserController.destroy')
  Route.resource('games', 'GameController')
    .apiOnly()
    .validator(new Map([[['games.store'], ['CreatedGame']], [['games.update'], ['UpdatedGame']]]))
}).middleware(['auth'])
