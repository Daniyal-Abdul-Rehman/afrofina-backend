// services/resolutionService.js
const httpStatus = require('http-status');
const { Resolution, Order } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a resolution
 * @param {Object} resolutionBody
 * @returns {Promise<Resolution>}
 */
const createResolution = async (resolutionBody) => {
  // Ensure the order exists
  const order = await Order.findById(resolutionBody.order);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const resolution = await Resolution.create(resolutionBody);
  return resolution;
};

/**
 * Query for resolutions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryResolutions = async (filter, options) => {
  const resolutions = await Resolution.paginate(filter, options);
  return resolutions;
};

/**
 * Get resolution by id
 * @param {ObjectId} id
 * @returns {Promise<Resolution>}
 */
const getResolutionById = async (id) => {
  return Resolution.findById(id);
};

/**
 * Update resolution by id
 * @param {ObjectId} resolutionId
 * @param {Object} updateBody
 * @returns {Promise<Resolution>}
 */
const updateResolutionById = async (resolutionId, updateBody) => {
  const resolution = await getResolutionById(resolutionId);
  if (!resolution) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resolution not found');
  }
  Object.assign(resolution, updateBody);
  await resolution.save();
  return resolution;
};

/**
 * Resolve resolution by id and update the order status if necessary
 * @param {ObjectId} resolutionId
 * @param {Object} adminDecision
 * @returns {Promise<Resolution>}
 */
const resolveResolutionById = async (resolutionId, adminDecision) => {
  const resolution = await getResolutionById(resolutionId);
  if (!resolution) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resolution not found');
  }

  resolution.status = 'resolved';
  resolution.adminDecision = adminDecision;
  resolution.resolutionDate = new Date();

  await resolution.save();

  // Handle order status update if necessary
  const order = await Order.findById(resolution.order);
  if (order) {
    if (resolution.resolutionType === 'cancel_order') {
      order.status = 'cancelled';
      await order.save();
    } else if (resolution.resolutionType === 'extend_delivery') {
      // Logic to extend delivery could be added here
    }
  }

  return resolution;
};

/**
 * Delete resolution by id
 * @param {ObjectId} resolutionId
 * @returns {Promise<Resolution>}
 */
const deleteResolutionById = async (resolutionId) => {
  const resolution = await getResolutionById(resolutionId);
  if (!resolution) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resolution not found');
  }
  await resolution.remove();
  return resolution;
};

module.exports = {
  createResolution,
  queryResolutions,
  getResolutionById,
  updateResolutionById,
  resolveResolutionById,
  deleteResolutionById,
};
