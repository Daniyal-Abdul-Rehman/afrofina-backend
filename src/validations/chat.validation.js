const Joi = require('joi');

const createChat = {
  body: Joi.object().keys({
    sender: Joi.string().required(),
    recipient: Joi.string().required(),
    message: Joi.string().required(),
  }),
};

const getChats = {
  query: Joi.object().keys({
    sender: Joi.string(),
    recipient: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChat = {
  params: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
};

const updateChat = {
  params: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    message: Joi.string().required(),
  }).min(1),
};

const deleteChat = {
  params: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
};

module.exports = {
  createChat,
  getChats,
  getChat,
  updateChat,
  deleteChat,
};
