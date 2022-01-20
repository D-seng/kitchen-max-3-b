const mongoose = require('mongoose')

const MealSchema = new mongoose.Schema({

  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  mainCourse: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Meal', MealSchema)
