import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '.env.local') });

console.log('Supabase URL:', process.env.VITE_SUPABASE_URL);
console.log('Supabase Anon Key:', process.env.VITE_SUPABASE_ANON_KEY ? '[REDACTED]' : 'undefined');

const app = express();

app.use(express.json());

app.get('/api/badges', async (req, res) => {
    try {
        const { default: badgesHandler } = await import('./server/api/badges.js');
        await badgesHandler(req, res);
    } catch (error) {
        console.error('Error handling badges request:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});