const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAssistance = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    message: Joi.string().required(),
  }),
};

const getAssistances = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAssistance = {
  params: Joi.object().keys({
    assistanceId: Joi.string().custom(objectId),
  }),
};

const updateAssistance = {
  params: Joi.object().keys({
    assistanceId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      message: Joi.string(),
    })
    .min(1),
};

const deleteAssistance = {
  params: Joi.object().keys({
    assistanceId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createAssistance,
  getAssistances,
  getAssistance,
  updateAssistance,
  deleteAssistance,
};
