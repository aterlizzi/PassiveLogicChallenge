export default class ComponentLackingSetupError extends Error {
  statusCode: number

  constructor(component: string) {
    super(`${component} component lacks the necessary setup to be created.`)
    this.statusCode = 400
  }
}
