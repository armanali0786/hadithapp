const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  image: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const CardList = mongoose.model('CardList', cardSchema);

module.exports = CardList;
