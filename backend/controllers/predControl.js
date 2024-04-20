
const { StatusCodes } = require('http-status-codes');
const Prediction = require('./../models/predModel');

async function toFileObject(url, originalname) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], originalname, { type: blob.type });

    return file;
  } catch (error) {
    console.error('Error converting URL to File object:', error);
    throw error;
  }
}

const predictDisease = async (file) => {
  const endpoint = 'https://som11-multimodel-tomato-disease-classification-t-1303b88.hf.space/predict';
  const response = await fetch(endpoint, {
    method: 'POST',
    body: file,
  });

  const data = await response.json();
  // console.log('disease data:', data);

  return data;
}

const predictLeaf = async (file) => {
  const endpoint = 'https://som11-tomato-leaf-or-not-tomato-leaf.hf.space/predict';
  const response = await fetch(endpoint, {
    method: 'POST',
    body: file,
  });

  const data = await response.json();
  // console.log('leaf data:', data);

  return data;
}

const createPrediction = async (req, res) => {
  try {
    const file = req.file;
    console.log('file:', file);

    if (!file) {
      throw new Error('No file uploaded');
    }

    const { path, originalname } = file;

    const fileObject = await toFileObject(path, originalname);

    const formData = new FormData();
    formData.append('fileUploadedByUser', fileObject);

    const leafData = await predictLeaf(formData);

    if (!leafData.success) {
      throw new Error('Failed to predict the leaf');
    }

    const { predicted_result } = leafData;

    if (predicted_result === 'not leaf') {
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'The uploaded image is not a leaf',
        data: null,
      });
    }

    const data = await predictDisease(formData);

    if (!data.success) {
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'Failed to predict the disease',
        data: null,
      });
    }

    const prediction = await Prediction.create({
      predictionOfAllModels: data.prediction_results_of_all_model,
      finalPredictedResultOfTheLeaf: data.final_predicted_result_of_the_leaf,
      predImageURL: path,
      createdBy: req.userId,
    });

    res.status(StatusCodes.CREATED).send({
      success: true,
      message: 'Prediction has been created successfully',
      data: prediction,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error.message || 'Internal Server Error',
      data: null,
    });
  }
};

const allPredictions = async (req, res) => {
  try {
    const allPredictions = await Prediction.find({ createdBy: req.userId });
    res.status(StatusCodes.OK).send({
      success: true,
      message: 'Your prediction history has been fetched successfully',
      data: allPredictions,
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
  createPrediction,
  allPredictions,
};
