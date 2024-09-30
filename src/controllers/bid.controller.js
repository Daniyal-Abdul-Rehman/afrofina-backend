const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bidService } = require('../services');

const createBid = catchAsync(async (req, res) => {
  const bid = await bidService.createBid(req.body);
  res.status(httpStatus.CREATED).send(bid);
});

const getBids = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'projectId', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bidService.queryBids(filter, options);
  res.send(result);
});

const getBid = catchAsync(async (req, res) => {
  const bid = await bidService.getBidById(req.params.bidId);
  if (!bid) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bid not found');
  }
  res.send(bid);
});

const updateBid = catchAsync(async (req, res) => {
  const bid = await bidService.updateBidById(req.params.bidId, req.body);
  res.send(bid);
});

const deleteBid = catchAsync(async (req, res) => {
  await bidService.deleteBidById(req.params.bidId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBid,
  getBids,
  getBid,
  updateBid,
  deleteBid,
};
