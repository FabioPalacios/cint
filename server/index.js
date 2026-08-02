const express = require('express');
const authRouter = require('./auth');
const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use('/auth', authRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/db-test', async (req, res) => {
  const { query } = require('./db');
  try {
    const result = await query('SELECT 1 AS value');
    res.json({ success: true, rows: result.recordset });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => console.log(`Server listening on ${port}`));
