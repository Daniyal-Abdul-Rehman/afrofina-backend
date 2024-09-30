const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBid = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    projectId: Joi.string().required().custom(objectId),
    bidAmount: Joi.number().required().positive(),
    connectsUsed: Joi.number().required().integer().positive(),
  }),
};

const getBids = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    projectId: Joi.string().custom(objectId),
    status: Joi.string().valid('pending', 'accepted', 'rejected'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBid = {
  params: Joi.object().keys({
    bidId: Joi.string().custom(objectId).required(),
  }),
};

const updateBid = {
  params: Joi.object().keys({
    bidId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string().valid('pending', 'accepted', 'rejected'),
    })
    .min(1),
};

const deleteBid = {
  params: Joi.object().keys({
    bidId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createBid,
  getBids,
  getBid,
  updateBid,
  deleteBid,
};
