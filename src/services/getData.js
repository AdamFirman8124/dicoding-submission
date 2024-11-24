
const {Firestore} = require('@google-cloud/firestore')
// Function to fetch prediction history from Firestore
const getPredictionHistories = async () => {
    try {
        const firestore= new Firestore();
        // Get a reference to the 'predictions' collection
        const predictionsRef = firestore.collection('predictions');
        
        // Fetch all documents from the 'predictions' collection
        const snapshot = await predictionsRef.get();

        // If there are no documents
        if (snapshot.empty) {
            return {
                status: 'fail',
                message: 'Tidak ada riwayat prediksi.',
            };
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

        return {
            status: 'success',
            data: histories,
        };
    } catch (error) {
        console.error('Error fetching prediction history:', error);
        return {
            status: 'fail',
            message: 'Terjadi kesalahan saat mengambil riwayat prediksi.',
        };
    }
};

module.exports = getPredictionHistories;
