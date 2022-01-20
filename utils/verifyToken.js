const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const verifyToken = token => {
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      console.log('Getting user from verifyToken.js', user, +new Date())
      return user
    } catch (err) {
      throw new AuthenticationError('Please sign in.')
      // throw new Error(err)
    }
  }
  // throw new AuthenticationError('Please sign in.')
}
module.exports = verifyToken
