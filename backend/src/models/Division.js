const mongoose = require('mongoose');

const DivisionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  icon: {
    type: String,
    required: [true, 'Please add an icon name'],
    trim: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  leaders: [{
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    contact: {
      type: String
    }
  }],
  meetingTimes: [{
    day: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Division', DivisionSchema);