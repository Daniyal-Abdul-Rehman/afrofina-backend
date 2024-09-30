const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation for creating an order
const createOrder = {
  body: Joi.object().keys({
    buyer: Joi.string().required().custom(objectId),
    seller: Joi.string().required().custom(objectId),
    service: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required().min(0),
    status: Joi.string().valid('pending', 'accepted', 'rejected', 'completed', 'cancelled').default('pending'),
    paymentStatus: Joi.string().valid('unpaid', 'paid').default('unpaid'),
    rating: Joi.number().min(0).max(5),
    review: Joi.string(),
    resolutions: Joi.array().items(Joi.string().custom(objectId)), // Optional: can be an array of ObjectIds
  }),
};

// Validation for querying orders
const getOrders = {
  query: Joi.object().keys({
    buyer: Joi.string().custom(objectId),
    seller: Joi.string().custom(objectId),
    service: Joi.string(),
    status: Joi.string().valid('pending', 'accepted', 'rejected', 'completed', 'cancelled'),
    paymentStatus: Joi.string().valid('unpaid', 'paid'),
    rating: Joi.number().min(0).max(5),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation for getting a specific order
const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().required().custom(objectId),
  }),
};

// Validation for updating an order
const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      buyer: Joi.string().custom(objectId),
      seller: Joi.string().custom(objectId),
      service: Joi.string(),
      description: Joi.string(),
      amount: Joi.number().min(0),
      status: Joi.string().valid('pending', 'accepted', 'rejected', 'completed', 'cancelled'),
      paymentStatus: Joi.string().valid('unpaid', 'paid'),
      rating: Joi.number().min(0).max(5),
      review: Joi.string(),
      resolutions: Joi.array().items(Joi.string().custom(objectId)), // Optional: can update resolutions field
    })
    .min(1),
};

// Validation for deleting an order
const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
