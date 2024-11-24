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
    handler: postPredictHandler,
 
  }
]
 
module.exports = routes;
