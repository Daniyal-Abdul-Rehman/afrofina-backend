const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bidValidation = require('../../validations/bid.validation');
const bidController = require('../../controllers/bid.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBids'), validate(bidValidation.createBid), bidController.createBid)
  .get(auth('getBids'), validate(bidValidation.getBids), bidController.getBids);

router
  .route('/:bidId')
  .get(auth('getBids'), validate(bidValidation.getBid), bidController.getBid)
  .patch(auth('manageBids'), validate(bidValidation.updateBid), bidController.updateBid)
  .delete(auth('manageBids'), validate(bidValidation.deleteBid), bidController.deleteBid);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bids
 *   description: Bid management and retrieval
 */

/**
 * @swagger
 * /bids:
 *   post:
 *     summary: Create a bid
 *     description: Only authorized users can create bids.
 *     tags: [Bids]
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
 *               - projectId
 *               - amount
 *               - connectsUsed
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the bid
 *               projectId:
 *                 type: string
 *                 description: The ID of the project the bid is for
 *               amount:
 *                 type: number
 *                 description: Bid amount
 *               connectsUsed:
 *                 type: number
 *                 description: The number of connects used for the bid
 *             example:
 *               userId: "603d2149f3f79fcafd1e8b91"
 *               projectId: "605c2149f3f79fcafd1e8b32"
 *               amount: 1500
 *               connectsUsed: 5
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bid'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all bids
 *     description: Only authorized users can retrieve all bids.
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The user ID who created the bid
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *         description: The project ID the bid is for
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *         description: The status of the bid
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort bids by field and order (e.g., createdAt:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of bids
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
 *                     $ref: '#/components/schemas/Bid'
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
 * /bids/{id}:
 *   get:
 *     summary: Get a bid
 *     description: Only authorized users can fetch bid details.
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bid ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bid'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a bid
 *     description: Only authorized users can update a bid.
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bid ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               connectsUsed:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, rejected]
 *             example:
 *               amount: 1600
 *               connectsUsed: 6
 *               status: accepted
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bid'
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
 *     summary: Delete a bid
 *     description: Only authorized users can delete a bid.
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bid ID
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
