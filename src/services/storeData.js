
const {Firestore} = require('@google-cloud/firestore')
async function storeData(id, data) {
  try {
    const db = new Firestore();
    const predictCollection = db.collection('predictions');
    await predictCollection.doc(id).set(data);
    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error storing data:', error);
    console.error(error); // Log error untuk debugging

        // Mengembalikan respons error jika ada kesalahan
        const response = h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
            error:error,
        });
        response.code(400); // Status code 400 untuk Bad Request
        return response;
  }
}
module.exports = storeData;
