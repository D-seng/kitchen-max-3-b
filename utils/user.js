const getFirstName = fullName => fullName.split(' ')[0]

const isValidPassword = pword => pword.length >= 8 && !pword.toLowerCase().includes('password')

module.exports.getFirstName = getFirstName
module.exports.isValidPassword = isValidPassword
