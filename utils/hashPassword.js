const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer.')
  }
  return bcrypt.hash(password, 15)
}

module.exports = hashPassword
