const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins'); // Assuming these are custom plugins you've created

const paymentSchema = mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nonce: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * Check if paymentId is taken
 * @param {string} paymentId - The payment's ID
 * @returns {Promise<boolean>}
 */
paymentSchema.statics.isPaymentIdTaken = async function (paymentId) {
  const payment = await this.findOne({ paymentId });
  return !!payment;
};

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
