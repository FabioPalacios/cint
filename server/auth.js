const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { query, getPool, sql } = require('./db');

const PASSWORD_MIN_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const JWT_EXPIRES_IN = '8h';

function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

function createAuthToken(user) {
  return jwt.sign({
    id: user?.Id || user?.id,
    email: user?.Email || user?.email,
    tipoRol: user?.TipoRol ?? user?.tipoRol,
    activo: user?.Activo ?? user?.activo
  }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyAuthToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function buildAuthCookie(token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${8 * 60 * 60};${secure}`;
}

function clearAuthCookie() {
  return 'auth_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
}

function requireAuth(req, res, next) {
  const token = req.cookies?.auth_token;
  const decoded = verifyAuthToken(token);

  if (!decoded) {
    return res.status(401).json({ success: false, message: 'No autenticado' });
  }

  req.user = decoded;
  next();
}

function isPasswordStrong(password) {
  if (typeof password !== 'string') return false;
  if (password.length < PASSWORD_MIN_LENGTH) return false;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const hasNoSpaces = !/\s/.test(password);
  return hasLower && hasUpper && hasNumber && hasSymbol && hasNoSpaces;
}

async function ensureUsersTable() {
  const createTableSql = `IF OBJECT_ID(N'dbo.Usuarios', N'U') IS NULL
    CREATE TABLE dbo.Usuarios (
      Id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
      Email NVARCHAR(200) UNIQUE NOT NULL,
      PasswordHash NVARCHAR(300) NOT NULL,
      TipoRol INT NOT NULL DEFAULT 0,
      FechaRegistro DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
      Activo BIT NOT NULL DEFAULT 1
    );`;
  const pool = await getPool();
  await pool.request().query(createTableSql);
}

router.post('/register', async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const tipoRol = Number(req.body?.tipoRol ?? 0);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Falta email o contraseña' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'El correo no es válido' });
  }
  if (!isPasswordStrong(password)) {
    return res.status(400).json({
      success: false,
      message: 'La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y símbolos, sin espacios.'
    });
  }
  if (!Number.isInteger(tipoRol) || tipoRol < 0 || tipoRol > 2) {
    return res.status(400).json({ success: false, message: 'El rol no es válido' });
  }

  try {
    await ensureUsersTable();
    const existingUser = await query('SELECT TOP 1 * FROM dbo.Usuarios WHERE Email = @Email', { Email: email });
    if (existingUser.recordset && existingUser.recordset.length > 0) {
      return res.status(409).json({ success: false, message: 'El correo ya está registrado' });
    }

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    const insertSql = `INSERT INTO dbo.Usuarios (Email, PasswordHash, TipoRol)
      VALUES (@Email, @PasswordHash, @TipoRol)`;
    const pool = await getPool();
    await pool.request()
      .input('Email', sql.NVarChar(200), email)
      .input('PasswordHash', sql.NVarChar(300), hash)
      .input('TipoRol', sql.Int, tipoRol)
      .query(insertSql);

    return res.json({ success: true, message: 'Usuario creado correctamente' });
  } catch (err) {
    console.error('Register error', {
      url: req.originalUrl,
      method: req.method,
      email
    }, err.message);
    return res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'production' ? 'Error en el servidor' : err.message
    });
  }
});

router.post('/login', async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Falta email o contraseña' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'El correo no es válido' });
  }

  try {
    await ensureUsersTable();
    const result = await query(
      'SELECT TOP 1 * FROM dbo.Usuarios WHERE Email = @Email AND Activo = 1',
      { Email: email }
    );
    const user = result.recordset && result.recordset[0];
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
    const match = bcrypt.compareSync(password, user.PasswordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const token = createAuthToken(user);
    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60 * 1000,
      path: '/'
    });

    return res.json({
      success: true,
      message: 'Login correcto',
      user: {
        id: user.Id,
        email: user.Email,
        tipoRol: user.TipoRol,
        activo: user.Activo
      }
    });
  } catch (err) {
    console.error('Login error', {
      url: req.originalUrl,
      method: req.method,
      email
    }, err.message);
    return res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'production' ? 'Error en el servidor' : err.message
    });
  }
});

router.get('/me', requireAuth, (req, res) => {
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

router.post('/logout', (req, res) => {
  res.clearCookie('auth_token', { path: '/', httpOnly: true, sameSite: 'lax' });
  return res.json({ success: true, message: 'Sesión cerrada' });
});

module.exports = { authRouter: router, requireAuth, createAuthToken, verifyAuthToken, buildAuthCookie, clearAuthCookie };
