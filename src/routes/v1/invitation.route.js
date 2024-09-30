const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const invitationValidation = require('../../validations/invitation.validation');
const invitationController = require('../../controllers/invitation.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageInvitations'), validate(invitationValidation.createInvitation), invitationController.createInvitation)
  .get(auth('getInvitations'), validate(invitationValidation.getInvitations), invitationController.getInvitations);

router
  .route('/:invitationId')
  .get(auth('getInvitations'), validate(invitationValidation.getInvitation), invitationController.getInvitation)
  .patch(auth('manageInvitations'), validate(invitationValidation.updateInvitation), invitationController.updateInvitation)
  .delete(auth('manageInvitations'), validate(invitationValidation.deleteInvitation), invitationController.deleteInvitation);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Invitation management for events
 */

/**
 * @swagger
 * /invitations:
 *   post:
 *     summary: Create an invitation
 *     description: Only authorized users can create invitations.
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - userId
 *               - status
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: The ID of the event
 *               userId:
 *                 type: string
 *                 description: The ID of the user being invited
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, declined]
 *                 description: The status of the invitation
 *             example:
 *               eventId: "605c2149f3f79fcafd1e8b32"
 *               userId: "603d2149f3f79fcafd1e8b91"
 *               status: pending
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Invitation'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all invitations
 *     description: Only authorized users can retrieve all invitations.
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: string
 *         description: The event ID for which to retrieve invitations
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The user ID who is invited
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, declined]
 *         description: The status of the invitations
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort invitations by field and order (e.g., createdAt:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of invitations
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Invitation'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /invitations/{id}:
 *   get:
 *     summary: Get an invitation
 *     description: Only authorized users can fetch invitation details.
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invitation ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Invitation'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an invitation
 *     description: Only authorized users can update an invitation.
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invitation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, declined]
 *             example:
 *               status: accepted
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Invitation'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an invitation
 *     description: Only authorized users can delete an invitation.
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invitation ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
