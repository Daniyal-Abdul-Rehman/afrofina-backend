const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().required(),
    salary: Joi.number().required(),
    createdBy: Joi.string().custom(objectId).required(),
  }),
};

const getJobs = {
  query: Joi.object().keys({
    title: Joi.string(),
    company: Joi.string(),
    location: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId),
  }),
};

const updateJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      company: Joi.string(),
      location: Joi.string(),
      salary: Joi.number(),
      createdBy: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
