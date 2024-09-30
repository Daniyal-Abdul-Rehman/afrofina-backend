const httpStatus = require('http-status');
const { Bid, User, Project } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a bid
 * @param {Object} bidBody
 * @returns {Promise<Bid>}
 */
const createBid = async (bidBody) => {
  const user = await User.findById(bidBody.userId);
  const project = await Project.findById(bidBody.projectId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  if (user.connects < bidBody.connectsUsed) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough connects');
  }

  user.connects -= bidBody.connectsUsed;
  await user.save();

  return Bid.create(bidBody);
};

/**
 * Query for bids
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryBids = async (filter, options) => {
  const bids = await Bid.paginate(filter, options);
  return bids;
};

/**
 * Get bid by id
 * @param {ObjectId} id
 * @returns {Promise<Bid>}
 */
const getBidById = async (id) => {
  const bid = await Bid.findById(id).populate('userId projectId');
  if (!bid) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bid not found');
  }
  return bid;
};

/**
 * Update bid by id
 * @param {ObjectId} bidId
 * @param {Object} updateBody
 * @returns {Promise<Bid>}
 */
const updateBidById = async (bidId, updateBody) => {
  const bid = await getBidById(bidId);
  if (!bid) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bid not found');
  }

  Object.assign(bid, updateBody);
  await bid.save();
  return bid;
};

/**
 * Delete bid by id
 * @param {ObjectId} bidId
 * @returns {Promise<Bid>}
 */
const deleteBidById = async (bidId) => {
  const bid = await getBidById(bidId);
  if (!bid) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bid not found');
  }
  await bid.remove();
  return bid;
};

module.exports = {
  createBid,
  queryBids,
  getBidById,
  updateBidById,
  deleteBidById,
};
