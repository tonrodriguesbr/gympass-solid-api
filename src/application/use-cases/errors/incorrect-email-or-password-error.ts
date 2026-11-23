export class IncorrectEmailOrPasswordError extends Error {
  constructor() {
    super("Incorrect email or password");
  }
}
