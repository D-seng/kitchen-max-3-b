const mongoose = require('mongoose')

const KitchenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  appointments: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: 'Appointment'
  },
  // unavailableSlots: [{
  //   type: String,
  //   required: false
  // }],
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  burners: {
    type: Number,
    required: false
  },
  imageUrl: [{
    type: String,
    required: false
  }],
  knives: {
    type: Boolean,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: false
  },
  utensils: {
    type: Boolean,
    required: false
  },
  walkin: {
    type: Boolean,
    required: false
  }
})

module.exports = mongoose.model('Kitchen', KitchenSchema)
