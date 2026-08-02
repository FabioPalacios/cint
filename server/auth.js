const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { query, getPool, sql } = require('./db');

const PASSWORD_MIN_LENGTH = 8;

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
  const { email, password, tipoRol } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Falta email o contraseña' });
  }
  if (!isPasswordStrong(password)) {
    return res.status(400).json({
      success: false,
      message: 'La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y símbolos, sin espacios.'
    });
  }

  try {
    await ensureUsersTable();
    const existingUser = await query('SELECT TOP 1 * FROM dbo.Usuarios WHERE Email = @Email', { Email: email });
    if (existingUser.recordset && existingUser.recordset.length > 0) {
      return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
    }

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    const insertSql = `INSERT INTO dbo.Usuarios (Email, PasswordHash, TipoRol)
      VALUES (@Email, @PasswordHash, @TipoRol)`;
    const pool = await getPool();
    await pool.request()
      .input('Email', sql.NVarChar(200), email)
      .input('PasswordHash', sql.NVarChar(300), hash)
      .input('TipoRol', sql.Int, tipoRol || 0)
      .query(insertSql);

    return res.json({ success: true, message: 'Usuario creado correctamente' });
  } catch (err) {
    console.error('Register error', err, {
      url: req.originalUrl,
      method: req.method,
      body: { email, tipoRol }
    });
    return res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'production' ? 'Error en el servidor' : err.message
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Falta email o contraseña' });
  }

  try {
    await ensureUsersTable();
    const result = await query(
      'SELECT TOP 1 * FROM dbo.Usuarios WHERE Email = @Email AND Activo = 1',
      { Email: email }
    );
    const user = result.recordset && result.recordset[0];
    if (!user) {
      return res.status(404).json({ success: false, message: 'No hay usuario registrado' });
    }
    const match = bcrypt.compareSync(password, user.PasswordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
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
    console.error('Login error', err, {
      url: req.originalUrl,
      method: req.method,
      body: { email }
    });
    return res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'production' ? 'Error en el servidor' : err.message
    });
  }
});

module.exports = router;
