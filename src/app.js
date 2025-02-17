import { connectToDatabase } from './db/mongodb.js';
import cors from 'cors';

// ... existing code ...

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

// ... existing code ... 