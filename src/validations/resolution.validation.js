// validations/resolution.validation.js
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createResolution = {
  body: Joi.object().keys({
    order: Joi.string().required().custom(objectId),
    raisedBy: Joi.string().required().custom(objectId),
    resolutionType: Joi.string().valid('extend_delivery', 'cancel_order').required(),
    reason: Joi.string().required().trim(),
    status: Joi.string().valid('pending', 'resolved', 'rejected').default('pending'),
    resolutionDate: Joi.date(),
    adminDecision: Joi.string().trim(),
  }),
};

const getResolutions = {
  query: Joi.object().keys({
    order: Joi.string().custom(objectId),
    raisedBy: Joi.string().custom(objectId),
    resolutionType: Joi.string().valid('extend_delivery', 'cancel_order'),
    status: Joi.string().valid('pending', 'resolved', 'rejected'),
    resolutionDate: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getResolution = {
  params: Joi.object().keys({
    resolutionId: Joi.string().custom(objectId),
  }),
};

const updateResolution = {
  params: Joi.object().keys({
    resolutionId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    order: Joi.string().custom(objectId),
    raisedBy: Joi.string().custom(objectId),
    resolutionType: Joi.string().valid('extend_delivery', 'cancel_order'),
    reason: Joi.string().trim(),
    status: Joi.string().valid('pending', 'resolved', 'rejected'),
    resolutionDate: Joi.date(),
    adminDecision: Joi.string().trim(),
  }).min(1),
};

const deleteResolution = {
  params: Joi.object().keys({
    resolutionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createResolution,
  getResolutions,
  getResolution,
  updateResolution,
  deleteResolution,
};
