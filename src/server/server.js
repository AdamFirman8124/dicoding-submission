require('dotenv').config();
 
const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');
 
(async () => {
    const server = Hapi.server({
        port: 8000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
            }
             });
 
    const model = await loadModel();
    server.app.model = model;
 
    server.route(routes);
 
   server.ext('onPreResponse', function (request, h) {
    const response = request.response;
    
    // Check for Payload Too Large error (413)
    if (response.isBoom && response.output.statusCode === 413) {
        const newResponse = h.response({
            status: 'fail',
            message: 'Payload content length is greater than maximum allowed (1MB).'
        }).code(413);
        return newResponse;
    }

     // Jika error terkait prediksi (misalnya InputError atau kesalahan umum)
    if (response instanceof InputError || response.isBoom) {
        console.log(response)
        const message = response instanceof InputError
            ? `${response.message} Silakan gunakan foto lain.`
            : 'Terjadi kesalahan dalam melakukan prediksi';
        
        const newResponse = h.response({
            status: 'fail',
            message: message
        }).code(400);
        return newResponse;
    }
    return h.continue;
});

 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();
