const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    try {
        const { image } = request.payload;
        // Check if the image exists in the payload
        if (!image) {
            throw new Error('No image file provided.');
        }

        // Check the content type of the uploaded file (image/jpeg or image/png)
        const contentType = image.hapi.headers['content-type'];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(contentType)) {
            throw new Error('Unsupported media type. Only JPEG and PNG images are allowed.');
        }
        const { model } = request.server.app;

        // Prediksi dengan memanggil fungsi 'predictClassification'
        const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            "id": id,
            "result": label,
            "suggestion": suggestion,
            "createdAt": createdAt
        };

        // Simpan data prediksi
        await storeData(id, data);

        const response = h.response({
            status: 'success',
            message: 'Model is predicted successfully.',
            data
        });
        response.code(201);
        return response;
    } catch (error) {
        console.error(error); // Log error untuk debugging

        // Mengembalikan respons error jika ada kesalahan
        const response = h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
            error: error,
        });
        response.code(400); // Status code 400 untuk Bad Request
        return response;
    }
}

module.exports = postPredictHandler;
