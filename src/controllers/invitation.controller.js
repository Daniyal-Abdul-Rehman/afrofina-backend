const httpStatus = require('http-status');
const { invitationService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const createInvitation = catchAsync(async (req, res) => {
  const invitation = await invitationService.createInvitation(req.body);
  res.status(httpStatus.CREATED).send(invitation);
});

const getInvitations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['event', 'user', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await invitationService.queryInvitations(filter, options);
  res.send(result);
});

const getInvitation = catchAsync(async (req, res) => {
  const invitation = await invitationService.getInvitationById(req.params.invitationId);
  if (!invitation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invitation not found');
  }
  res.send(invitation);
});

const updateInvitation = catchAsync(async (req, res) => {
  const invitation = await invitationService.updateInvitationById(req.params.invitationId, req.body);
  res.send(invitation);
});

const deleteInvitation = catchAsync(async (req, res) => {
  await invitationService.deleteInvitationById(req.params.invitationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInvitation,
  getInvitations,
  getInvitation,
  updateInvitation,
  deleteInvitation,
};
