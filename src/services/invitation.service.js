const httpStatus = require('http-status');
const { Invitation } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an invitation
 * @param {Object} invitationBody
 * @returns {Promise<Invitation>}
 */
const createInvitation = async (invitationBody) => {
  return Invitation.create(invitationBody);
};

/**
 * Query for invitations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryInvitations = async (filter, options) => {
  const invitations = await Invitation.paginate(filter, options);
  return invitations;
};

/**
 * Get invitation by id
 * @param {ObjectId} id
 * @returns {Promise<Invitation>}
 */
const getInvitationById = async (id) => {
  return Invitation.findById(id).populate('event user');
};

/**
 * Update invitation by id
 * @param {ObjectId} invitationId
 * @param {Object} updateBody
 * @returns {Promise<Invitation>}
 */
const updateInvitationById = async (invitationId, updateBody) => {
  const invitation = await getInvitationById(invitationId);
  if (!invitation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invitation not found');
  }
  Object.assign(invitation, updateBody);
  await invitation.save();
  return invitation;
};

/**
 * Delete invitation by id
 * @param {ObjectId} invitationId
 * @returns {Promise<Invitation>}
 */
const deleteInvitationById = async (invitationId) => {
  const invitation = await getInvitationById(invitationId);
  if (!invitation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invitation not found');
  }
  await invitation.remove();
  return invitation;
};

module.exports = {
  createInvitation,
  queryInvitations,
  getInvitationById,
  updateInvitationById,
  deleteInvitationById,
};
