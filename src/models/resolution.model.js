const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const resolutionSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resolutionType: {
      type: String,
      enum: ['extend_delivery', 'cancel_order'],
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'resolved', 'rejected'],
      default: 'pending',
    },
    resolutionDate: {
      type: Date,
    },
    adminDecision: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to json
resolutionSchema.plugin(toJSON);
resolutionSchema.plugin(paginate);

const Resolution = mongoose.model('Resolution', resolutionSchema);

module.exports = Resolution;
