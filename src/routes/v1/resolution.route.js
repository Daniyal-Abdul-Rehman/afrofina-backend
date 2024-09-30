const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const resolutionValidation = require('../../validations/resolution.validation');
const resolutionController = require('../../controllers/resolution.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createResolutions'), validate(resolutionValidation.createResolution), resolutionController.createResolution)
  .get(auth('getResolutions'), validate(resolutionValidation.getResolutions), resolutionController.getResolutions);

router
  .route('/:resolutionId')
  .get(auth('getResolutions'), validate(resolutionValidation.getResolution), resolutionController.getResolution)
  .patch(auth('updateResolutions'), validate(resolutionValidation.updateResolution), resolutionController.updateResolution)
  .delete(auth('deleteResolutions'), validate(resolutionValidation.deleteResolution), resolutionController.deleteResolution);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Resolutions
 *   description: Resolution management and retrieval
 */

/**
 * @swagger
 * /resolutions:
 *   post:
 *     summary: Create a resolution
 *     description: Only authenticated users can create resolutions.
 *     tags: [Resolutions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resolution'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Resolution'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all resolutions
 *     description: Only admins or authorized users can retrieve all resolutions.
 *     tags: [Resolutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Order ID
 *       - in: query
 *         name: raisedBy
 *         schema:
 *           type: string
 *         description: User ID who raised the resolution
 *       - in: query
 *         name: resolutionType
 *         schema:
 *           type: string
 *           enum: ['extend_delivery', 'cancel_order']
 *         description: Type of resolution
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['pending', 'resolved', 'rejected']
 *         description: Resolution status
 *       - in: query
 *         name: resolutionDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Resolution date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (ex. createdAt:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of resolutions
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
 *                     $ref: '#/components/schemas/Resolution'
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
 */

/**
 * @swagger
 * /resolutions/{resolutionId}:
 *   get:
 *     summary: Get a resolution
 *     description: Only authenticated users can fetch their own resolutions. Only admins can fetch any resolution.
 *     tags: [Resolutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resolutionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Resolution ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Resolution'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a resolution
 *     description: Only authenticated users can update their own resolutions. Only admins can update any resolution.
 *     tags: [Resolutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resolutionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Resolution ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resolution'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Resolution'
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
 *     summary: Delete a resolution
 *     description: Only authenticated users can delete their own resolutions. Only admins can delete any resolution.
 *     tags: [Resolutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resolutionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Resolution ID
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
