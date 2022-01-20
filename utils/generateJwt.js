const jwt = require('jsonwebtoken')

// incorporate isCook and isKitchenOwner.

const generateJwt = (userId, username, isCook, isKitchenOwner) => jwt.sign({ userId, username, isCook, isKitchenOwner }, process.env.JWT_SECRET, { expiresIn: '7 days' })

module.exports = generateJwt
