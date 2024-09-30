const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReview = {
  body: Joi.object().keys({
    order: Joi.string().required().custom(objectId),
    buyer: Joi.string().required().custom(objectId),
    seller: Joi.string().required().custom(objectId),
    rating: Joi.number().required().min(0).max(5),
    review: Joi.string(),
  }),
};

const getReviews = {
  query: Joi.object().keys({
    order: Joi.string().custom(objectId),
    buyer: Joi.string().custom(objectId),
    seller: Joi.string().custom(objectId),
    rating: Joi.number().min(0).max(5),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    reviewId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      rating: Joi.number().min(0).max(5),
      review: Joi.string(),
    })
    .min(1),
};

const deleteReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
