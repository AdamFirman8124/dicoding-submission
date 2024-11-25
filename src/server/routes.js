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
        multipart: true,
       maxBytes: 1000000 // Atur batas payload di level rute

      },

            validate: {
                failAction: async (request, h, err) => {
                    if (err.output.statusCode === 413) {
                        return h.response({
                            status: 'fail',
                            message: 'Payload content length greater than maximum allowed: 1000000'
                        }).code(413).takeover();
                    }
                    throw err;
                }
            }
    },
    handler: postPredictHandler,
 
  }
]
 
module.exports = routes;
