'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Youch = use('youch')
const Env = use('Env')

const Raven = require('raven')
const Config = use('Config')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }
    if (error.name === 'InvalidJwtToken') {
      return response.status(401).send({ error: { message: 'Authentication failure' } })
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJson = await youch.toJSON()

      return response.status(error.status).send(errorJson)
    }

    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    Raven.config(Config.get('services.sentry.dsn'))
    Raven.captureException(error)
  }
}

module.exports = ExceptionHandler
