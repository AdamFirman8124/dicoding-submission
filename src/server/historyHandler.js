// Handler for fetching prediction history
const getPredictionHistoryHandler = async (request, h) => {
    try {
        // Get a reference to the 'predictions' collection
        const predictionsRef = firestore.collection('predictions');
        
        // Fetch all documents in the 'predictions' collection
        const snapshot = await predictionsRef.get();

        // If there are no documents
        if (snapshot.empty) {
            return h.response({
                status: 'fail',
                message: 'Tidak ada riwayat prediksi.',
            }).code(404);
        }

        // Process the data and format it into the desired structure
        const histories = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                history: {
                    id: doc.id,
                    result: data.result,
                    createdAt: data.createdAt.toDate().toISOString(), // Ensure proper date formatting
                    suggestion: data.suggestion,
                }
            };
        });

        // Return the formatted history data
        return h.response({
            status: 'success',
            data: histories,
        }).code(200);
        
    } catch (error) {
        console.error('Error fetching prediction history:', error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan saat mengambil riwayat prediksi.',
        }).code(500);
    }
};

module.exports = getPredictionHistoryHandler;
