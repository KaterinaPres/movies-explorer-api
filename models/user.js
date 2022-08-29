const mongoose = require('mongoose');

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
    email: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.set('toJSON', {
  transform(doc, ret) {
    const res = ret;
    delete res.password;
    delete res.__v;
  },
});

module.exports = mongoose.model('user', userSchema);
