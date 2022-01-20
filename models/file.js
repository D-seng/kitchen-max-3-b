const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  encoding: {
    type: String,
    require: true
  }

})

module.exports = mongoose.model('File', FileSchema)
