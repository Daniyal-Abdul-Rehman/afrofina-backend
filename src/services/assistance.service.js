const httpStatus = require('http-status');
const { Assistance, User } = require('../models');
const ApiError = require('../utils/ApiError');
const axios = require('axios');
const { error } = require('../config/logger');

/**
 * Create an assistance record
 * @param {Object} assistanceBody
 * @returns {Promise<Assistance>}
 */
const createAssistance = async (assistanceBody) => {
  try {
    const { userId, message } = assistanceBody;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Call OpenAI API to generate response
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer sk-proj-A0dZKillWg1HXLEnl0rQT3BlbkFJJ4j09wi6vHAM991D04sC`,
        'Content-Type': 'application/json',
      }
    }).catch((error)=>{console.log(error?.response)});

    const gptMessage = response.data.choices[0].message.content;

    // Create Assistance record
    const assistance = new Assistance({
      user: userId,
      userMessage: message,
      gptResponse: gptMessage,
    });
    await assistance.save();

    return assistance;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Query for assistance records
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryAssistances = async (filter, options) => {
  try {
    const assistances = await Assistance.paginate(filter, options);
    return assistances;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get assistance by id
 * @param {ObjectId} id
 * @returns {Promise<Assistance>}
 */
const getAssistanceById = async (id) => {
  try {
    const assistance = await Assistance.findById(id).populate('user');
    if (!assistance) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Assistance record not found');
    }
    return assistance;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Update assistance by id
 * @param {ObjectId} assistanceId
 * @param {Object} updateBody
 * @returns {Promise<Assistance>}
 */
const updateAssistanceById = async (assistanceId, updateBody) => {
  try {
    const assistance = await Assistance.findByIdAndUpdate(assistanceId, updateBody, { new: true });
    if (!assistance) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Assistance record not found');
    }
    return assistance;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Delete assistance by id
 * @param {ObjectId} assistanceId
 * @returns {Promise<Assistance>}
 */
const deleteAssistanceById = async (assistanceId) => {
  try {
    const assistance = await Assistance.findByIdAndDelete(assistanceId);
    if (!assistance) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Assistance record not found');
    }
    return assistance;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

module.exports = {
  createAssistance,
  queryAssistances,
  getAssistanceById,
  updateAssistanceById,
  deleteAssistanceById,
};
