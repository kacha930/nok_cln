// mock-server.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Adjust port if using Vite dev server
app.use(express.json());

// Mock SIM status
let simLocked = true;

// GET SIM status
app.get('/api/sim/status', (req, res) => {
  res.json({ locked: simLocked });
});

// POST unlock SIM
app.post('/api/sim/unlock', (req, res) => {
  const { pin } = req.body;
  if (pin === '1234') {
    simLocked = false;
    return res.json({ success: true, message: 'SIM unlocked!' });
  }
  res.status(400).json({ success: false, message: 'Incorrect PIN' });
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
