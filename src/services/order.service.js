const httpStatus = require('http-status');
const { Order, Payment, Resolution } = require('../models'); // Import the Resolution model
const ApiError = require('../utils/ApiError');
const { processSquarePayment, distributeFunds } = require('../utils/square');

/**
 * Create an order
 * @param {Object} orderBody
 * @param {String} nonce
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody, nonce) => {
  const order = await Order.create(orderBody);
  
  // Process payment
  const paymentResult = await processSquarePayment(nonce, orderBody.amount);
  if (!paymentResult.success) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment failed');
  }

  const payment = await Payment.create({
    paymentId: paymentResult.paymentId,
    nonce,
    amount: orderBody.amount,
    currency: 'USD',
    userId: orderBody.buyer,
    status: 'paid',
  });

  if (!payment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment creation failed');
  }

  order.paymentStatus = 'paid';
  await order.save();
  
  return order;
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return Order.findById(id).populate('resolutions'); // Optionally populate resolutions
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Complete order by id and distribute funds
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const completeOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  if (order.status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order cannot be completed');
  }

  // Distribute funds
  const adminAmount = order.amount * 0.2;
  const sellerAmount = order.amount * 0.8;

  const distributeResult = await distributeFunds(order.buyer, order.seller, adminAmount, sellerAmount);
  if (!distributeResult.success) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Funds distribution failed');
  }

  order.status = 'completed';
  order.adminPaymentStatus = 'paid';
  await order.save();
  
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  completeOrderById,
  deleteOrderById,
};
