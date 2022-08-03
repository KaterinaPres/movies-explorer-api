class NotAutorization extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotAutorization';
    this.statusCode = 401;
  }
}

module.exports = NotAutorization;
