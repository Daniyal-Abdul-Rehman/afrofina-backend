const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInvitation = {
  body: Joi.object().keys({
    event: Joi.string().required().custom(objectId),
    user: Joi.string().required().custom(objectId),
  }),
};

const updateInvitation = {
  params: Joi.object().keys({
    invitationId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('pending', 'accepted', 'declined'),
  }).min(1),
};

const getInvitations = {
  query: Joi.object().keys({
    event: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    status: Joi.string().valid('pending', 'accepted', 'declined'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInvitation = {
  params: Joi.object().keys({
    invitationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInvitation,
  updateInvitation,
  getInvitations,
  getInvitation,
};
