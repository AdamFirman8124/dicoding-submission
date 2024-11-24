const postPredictHandler = require('../server/handler');
const getPredictionHistoryHandler = require('../server/historyHandler');
const routes = [
 {
  path:'/predict/histories',
  method:'GET',
  handler:getPredictionHistoryHandler,

 },
  {
    path: '/predict',
    method: 'POST',
    options: {
      payload: {
        maxBytes: 1024 * 1024,  // Limit payload size to 1MB
        parse: true,  // Parse the payload
        allow: 'multipart/form-data',  // Allow image uploads via multipart/form-data
        output: 'data',  // Output the data directly
      }
    },
    handler: postPredictHandler,
 
  }
]
 
module.exports = routes;
