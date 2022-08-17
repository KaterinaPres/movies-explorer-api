class SomeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SomeError';
    this.statusCode = 500;
  }
}

module.exports = SomeError;
