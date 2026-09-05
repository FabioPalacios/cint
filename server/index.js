const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { authRouter, requireAuth } = require('./auth');

const app = express();
const port = process.env.PORT || 3001;
const allowedOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173']);

app.disable('x-powered-by');
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'same-site' },
  contentSecurityPolicy: false
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Demasiados intentos. Intenta de nuevo más tarde.'
  }
});

app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use('/auth', authLimiter, authRouter);
app.use('/api', requireAuth);

app.get('/api/profile', (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      tipoRol: req.user.tipoRol,
      activo: req.user.activo
    }
  });
});

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
