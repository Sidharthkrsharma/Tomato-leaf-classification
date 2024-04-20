const { StatusCodes } = require('http-status-codes');
const Feedback = require('./../models/feedbackModel');

const createFeedbackOfUser = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ createdBy: req.userId });

    if (feedback) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'You have already given feedback',
        data: null,
      });
    }

    await Feedback.create({
      ...req.body,
      createdBy: req.userId,
    });

    res.status(StatusCodes.CREATED).send({
      success: true,
      message: 'Feedback has been successfully saved',
      data: null,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error.message || 'Internal Server Error',
      data: null,
    });
  }
};

const getFeedbackOfUser = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ createdBy: req.userId });

    if (!feedback) {
      return res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: 'Feedback not found',
        data: null,
      });
    }

    res.status(StatusCodes.OK).send({
      success: true,
      message: 'Feedback found',
      data: feedback.rating,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error.message || 'Internal Server Error',
      data: null,
    });
  }
};

module.exports = {
  createFeedbackOfUser,
  getFeedbackOfUser,  
};
