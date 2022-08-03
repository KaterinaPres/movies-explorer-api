class Conflict extends Error {
  constructor() {
    super('Email уже занят');
    this.name = 'Conflict';
    this.statusCode = 409;
    // this.message = 'Email уже занят';
  }
}

module.exports = Conflict;
