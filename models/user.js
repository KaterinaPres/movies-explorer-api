const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    // default: 'Katrine',
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: {
      validate: {
        validator: (v) => isEmail(v),
        message: 'Заполните email в правльном формате',
      },
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо ввести пароль'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
