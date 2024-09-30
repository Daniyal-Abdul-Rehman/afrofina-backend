const mongoose = require('mongoose');

const assistanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userMessage: {
      type: String,
      required: true,
    },
    gptResponse: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Assistance
 */
const Assistance = mongoose.model('Assistance', assistanceSchema);

module.exports = Assistance;
