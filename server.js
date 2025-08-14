import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import https from 'https';

const app = express();
const PORT = 3000;
const API_BASE = 'https://stn-examen-ctd5q6-bfec83-77-237-241-121.traefik.me';

// Agent HTTPS qui ignore les certificats non fiables
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

app.use(cors());
app.use(express.json());

// GET /messages
app.get('/messages', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE}/messages`, { agent: httpsAgent });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /messages
app.post('/messages', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
            agent: httpsAgent
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
