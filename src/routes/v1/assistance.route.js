const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const assistanceValidation = require('../../validations/assistance.validation');
const assistanceController = require('../../controllers/assistance.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createAssistance'), validate(assistanceValidation.createAssistance), assistanceController.createAssistance)
  .get(auth('getAssistances'), validate(assistanceValidation.getAssistances), assistanceController.getAssistances);

router
  .route('/:assistanceId')
  .get(auth('getAssistances'), validate(assistanceValidation.getAssistance), assistanceController.getAssistance)
  .patch(auth('manageAssistances'), validate(assistanceValidation.updateAssistance), assistanceController.updateAssistance)
  .delete(auth('manageAssistances'), validate(assistanceValidation.deleteAssistance), assistanceController.deleteAssistance);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Assistances
 *   description: Assistance management and retrieval
 */

/**
 * @swagger
 * /assistance:
 *   post:
 *     summary: Create an assistance record
 *     description: Logged-in users can create an assistance record.
 *     tags: [Assistances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *                 format: objectId
 *                 description: ID of the user creating the assistance
 *               message:
 *                 type: string
 *                 description: User's message for assistance
 *             example:
 *               userId: 60f1c927de6b2f0015b99d93
 *               message: "I need help with..."
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assistance'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all assistance records
 *     description: Admins can retrieve all assistance records.
 *     tags: [Assistances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID to filter assistance records (optional)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Maximum number of records per page (default = 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (default = 1)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueryResult'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /assistances/{assistanceId}:
 *   get:
 *     summary: Get an assistance record
 *     description: Logged-in users can retrieve their own assistance record. Admins can retrieve any assistance record.
 *     tags: [Assistances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assistanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Assistance record ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assistance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an assistance record
 *     description: Logged-in users can update their own assistance record. Admins can update any assistance record.
 *     tags: [Assistances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assistanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Assistance record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Updated message for assistance
 *             example:
 *               message: "Updated assistance message"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assistance'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an assistance record
 *     description: Logged-in users can delete their own assistance record. Admins can delete any assistance record.
 *     tags: [Assistances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assistanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Assistance record ID
 *     responses:
 *       "204":
 *         description: No Content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
