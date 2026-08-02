const os = require('os');
const sql = require('mssql');
require('dotenv').config();

const rawServer = process.env.DB_SERVER || 'localhost';
let server = rawServer;
let instanceName;
let port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

if (rawServer.includes('\\')) {
  const parts = rawServer.split('\\');
  server = parts[0] || 'localhost';
  instanceName = parts[1];
}

const localNames = new Set([
  'localhost',
  '127.0.0.1',
  '.',
  os.hostname(),
  os.hostname().toLowerCase(),
  os.hostname().toUpperCase()
]);

if (localNames.has(server)) {
  server = 'localhost';
}

if (port) {
  instanceName = undefined;
}

const baseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server,
  database: process.env.DB_DATABASE,
  port: port || undefined,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERT === 'true',
    instanceName,
    enableArithAbort: true
  },
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  connectionTimeout: 30000,
  requestTimeout: 30000
};

const fallbackConfig = {
  ...baseConfig,
  port: port || 1433,
  options: {
    ...baseConfig.options,
    instanceName: undefined
  }
};

console.log('DB connect config', {
  server: baseConfig.server,
  instanceName: baseConfig.options.instanceName,
  port: baseConfig.port,
  database: baseConfig.database,
  encrypt: baseConfig.options.encrypt,
  trustServerCertificate: baseConfig.options.trustServerCertificate
});

let pool;

async function getPool() {
  if (pool) return pool;
  try {
    pool = await sql.connect(baseConfig);
    return pool;
  } catch (err) {
    console.warn('Primary DB connection failed, trying fallback port config', {
      error: err.message,
      server: baseConfig.server,
      instanceName: baseConfig.options.instanceName,
      port: baseConfig.port,
      fallbackPort: fallbackConfig.port
    });
    pool = await sql.connect(fallbackConfig);
    return pool;
  }
}

async function query(sqlText, params = {}) {
  const p = await getPool();
  const req = p.request();
  for (const [k, v] of Object.entries(params)) {
    req.input(k, v);
  }
  const result = await req.query(sqlText);
  return result;
}

module.exports = { getPool, query, sql };
