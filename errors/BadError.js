class BadError extends Error {
  constructor(message) {
    let messageText;
    if (typeof message === 'undefined') {
      messageText = 'Переданы некорректные данные';
    } else {
      messageText = message;
    }
    super(messageText);
    this.name = 'BadError';
    this.statusCode = 400;
  }
}

module.exports = BadError;
