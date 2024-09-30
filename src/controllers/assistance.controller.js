const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const assistanceService = require('../services/assistance.service');

const createAssistance = catchAsync(async (req, res) => {
  const assistance = await assistanceService.createAssistance(req.body);
  res.status(httpStatus.CREATED).send(assistance);
});

const getAssistances = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await assistanceService.queryAssistances(filter, options);
  res.send(result);
});

const getAssistance = catchAsync(async (req, res) => {
  const assistance = await assistanceService.getAssistanceById(req.params.assistanceId);
  if (!assistance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assistance record not found');
  }
  res.send(assistance);
});

const updateAssistance = catchAsync(async (req, res) => {
  const assistance = await assistanceService.updateAssistanceById(req.params.assistanceId, req.body);
  res.send(assistance);
});

const deleteAssistance = catchAsync(async (req, res) => {
  await assistanceService.deleteAssistanceById(req.params.assistanceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAssistance,
  getAssistances,
  getAssistance,
  updateAssistance,
  deleteAssistance,
};
