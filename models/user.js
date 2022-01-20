const hashPassword = require('../utils/hashPassword.js')

const mongoose = require('mongoose')
// const md5 = require('md5')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true

  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: 'Post'
  },
  appointments: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: 'Appointment'
  },
  kitchens: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: 'Kitchen'
  },
  isCook: {
    type: Boolean,
    required: true
  },
  isKitchenOwner: {
    type: Boolean,
    required: true
  }
})

// UserSchema.pre('save', function (next) {
//   this.avatar = `http://gravatar.com/avatar${md5(this.username)}?d=identicon`
//   next()
// })

UserSchema.pre('save', async function (next) {
  const pword = await hashPassword(this.password)
  this.password = pword
  next()
})

// UserSchema.pre('updateOne', { document: true, query: false },
//   async function (next) {
//     const pword = await hashPassword(this.password)
//     console.log('pword', pword)
//     this.password = pword
//     next()
//   })

module.exports = mongoose.model('User', UserSchema)
