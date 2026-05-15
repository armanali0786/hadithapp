// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const QuestionSchema = new Schema({
//   question: {
//     type: String,
//     required: [true, 'A question must have text'],
//     trim: true,
//     unique: true
//   },
//   category: {
//     type: String,
//     required: [true, 'A question must have category'],
//     trim: true
//   },
//   type: {
//     type: String,
//     required: [true, 'A question must have type'],
//     trim: true
//   },
//   difficulty: {
//     type: String,
//     required: [true, 'A question must have difficulty'],
//     trim: true
//   },
//   correctAnswer: {
//     type: String,
//     required: [true, 'A question must have correct answer'],
//     trim: true
//   },
//   incorrectAnswer: {
//     type: Array,
//     required: [true, 'A question must have incorrect answer'],
//     trim: true
//   }
// })

// const Questions = mongoose.model('Question', QuestionSchema)

// module.exports = Questions

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  choices: [{
    id: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
