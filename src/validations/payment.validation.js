const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPayment = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    currency: Joi.string().required().valid('USD', 'EUR', 'GBP', 'AUD', 'CAD'), // Add any other supported currencies here
    userId: Joi.string().required().custom(objectId),
    nonce: Joi.string().required(),
    status: Joi.string().required().valid('pending', 'completed', 'failed'),
  }),
};

const getPayments = {
  query: Joi.object().keys({
    status: Joi.string().valid('pending', 'completed', 'failed'),
    userId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId),
  }),
};

const updatePayment = {
  params: Joi.object().keys({
    paymentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      amount: Joi.number(),
      currency: Joi.string().valid('USD', 'EUR', 'GBP', 'AUD', 'CAD'), // Add any other supported currencies here
      nonce: Joi.string(),
      status: Joi.string().valid('pending', 'completed', 'failed'),
    })
    .min(1),
};

const deletePayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
};
