// controllers/resolutionController.js
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { resolutionService } = require('../services');

const createResolution = catchAsync(async (req, res) => {
  const resolution = await resolutionService.createResolution(req.body);
  res.status(httpStatus.CREATED).send(resolution);
});

const getResolutions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['order', 'raisedBy', 'resolutionType', 'status', 'resolutionDate']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await resolutionService.queryResolutions(filter, options);
  res.send(result);
});

const getResolution = catchAsync(async (req, res) => {
  const resolution = await resolutionService.getResolutionById(req.params.resolutionId);
  if (!resolution) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resolution not found');
  }
  res.send(resolution);
});

const updateResolution = catchAsync(async (req, res) => {
  const resolution = await resolutionService.updateResolutionById(req.params.resolutionId, req.body);
  if (!resolution) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resolution not found');
  }
  res.send(resolution);
});

const deleteResolution = catchAsync(async (req, res) => {
  const resolution = await resolutionService.deleteResolutionById(req.params.resolutionId);
  if (!resolution) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resolution not found');
  }
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createResolution,
  getResolutions,
  getResolution,
  updateResolution,
  deleteResolution,
};
