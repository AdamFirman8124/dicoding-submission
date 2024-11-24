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
        allow: 'multipart/form-data',
        multipart: true
      }
    },
    handler: postPredictHandler,
 
  }
]
 
module.exports = routes;
