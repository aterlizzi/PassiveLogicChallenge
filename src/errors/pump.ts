export default class NoGaseousPumpsError extends Error {
  statusCode: number

  constructor() {
    super('Gases are not valid working fluids for Pumps.')
    this.statusCode = 422
  }
}
