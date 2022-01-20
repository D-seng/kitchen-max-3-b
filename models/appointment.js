const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  kitchen: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Kitchen'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  details: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  meal: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)
