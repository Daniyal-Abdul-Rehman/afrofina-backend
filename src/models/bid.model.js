const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins'); // Assuming you're using the same plugins

const bidSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencing the User model
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project', // Assuming you have a Project model
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    connectsUsed: {
      type: Number,
      required: true, // Number of connects used for this bid
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending', // Status of the bid
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bidSchema.plugin(toJSON);
bidSchema.plugin(paginate);

/**
 * @typedef Bid
 */
const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
