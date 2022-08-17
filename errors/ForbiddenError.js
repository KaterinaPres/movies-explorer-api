class ForbiddenError extends Error {
  constructor(message) {
    let messageText;
    if (typeof message === 'undefined') {
      messageText = 'Нет прав для удаления карточки';
    } else {
      messageText = message;
    }
    super(messageText);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
    // this.message = 'Нет прав для удаления карточки';
  }
}

module.exports = ForbiddenError;
