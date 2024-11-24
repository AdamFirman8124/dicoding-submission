// getPredictionHistoryHandler.js
const getPredictionHistories = require('../services/getData');

const getPredictionHistoryHandler = async (request, h) => {
    // Call the function to get prediction histories
    const result = await getPredictionHistories();

    // Check if the status is 'success'
    if (result.status === 'fail') {
        return h.response({
            status: result.status,
            message: result.message,
        }).code(500);
    }

    // If successful, return the prediction history
    return h.response(result).code(200);
};

module.exports = getPredictionHistoryHandler;
