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

router.post('/register', async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const fullName = typeof req.body?.fullName === 'string' ? req.body.fullName.trim() : '';
  const phone = typeof req.body?.phone === 'string' ? req.body.phone.trim() : '';
  const tipoRol = Number(req.body?.tipoRol ?? 0);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Falta email o contraseña' });
  }
  if (!fullName) {
    return res.status(400).json({ success: false, message: 'Falta el nombre completo' });
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

router.post('/complete-profile', async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const userId = typeof req.body?.userId === 'string' ? req.body.userId : '';
  const fullName = typeof req.body?.fullName === 'string' ? req.body.fullName.trim() : '';
  const phone = typeof req.body?.phone === 'string' ? req.body.phone.trim() : '';
  const tipoRol = Number(req.body?.tipoRol ?? 0);
  const departamento = typeof req.body?.departamento === 'string' ? req.body.departamento.trim() : '';
  const municipio = typeof req.body?.municipio === 'string' ? req.body.municipio.trim() : '';
  const direccion = typeof req.body?.direccion === 'string' ? req.body.direccion.trim() : '';
  const fotoPerfil = typeof req.body?.fotoPerfil === 'string' ? req.body.fotoPerfil.trim() : '';

  if ((!userId && !email) || !tipoRol || !departamento || !municipio) {
    return res.status(400).json({ success: false, message: 'Faltan datos de perfil obligatorios' });
  }
  if (!Number.isInteger(tipoRol) || tipoRol < 1 || tipoRol > 2) {
    return res.status(400).json({ success: false, message: 'El tipo de rol no es válido' });
  }

  try {
    const userQuery = userId
      ? await query('SELECT TOP 1 * FROM dbo.Usuarios WHERE Id = @UserId', { UserId: userId })
      : await query('SELECT TOP 1 * FROM dbo.Usuarios WHERE Email = @Email', { Email: email });

    const user = userQuery.recordset && userQuery.recordset[0];
    if (!user) {
      return res.status(404).json({ success: false, message: 'No se encontró el usuario para completar el perfil' });
    }

    const pool = await getPool();
    const location = [departamento, municipio, direccion].filter(Boolean).join(', ');

    if (tipoRol === 1) {
      await pool.request()
        .input('Id', sql.UniqueIdentifier, user.Id)
        .input('NombreCompleto', sql.NVarChar(255), fullName || email)
        .input('Telefono', sql.NVarChar(50), phone || null)
        .input('TipoComprador', sql.Int, 1)
        .input('Departamento', sql.NVarChar(120), departamento)
        .input('Municipio', sql.NVarChar(120), municipio)
        .input('Direccion', sql.NVarChar(250), direccion || null)
        .input('FotoPerfil', sql.NVarChar(500), fotoPerfil || null)
        .query(`IF EXISTS (SELECT 1 FROM dbo.Compradores WHERE Id = @Id)
          UPDATE dbo.Compradores
          SET NombreCompleto = @NombreCompleto, Telefono = @Telefono, TipoComprador = @TipoComprador,
              Departamento = @Departamento, Municipio = @Municipio, Direccion = @Direccion, FotoPerfil = @FotoPerfil
          WHERE Id = @Id
        ELSE
          INSERT INTO dbo.Compradores
            (Id, NombreCompleto, Telefono, TipoComprador, Departamento, Municipio, Direccion, FotoPerfil)
          VALUES (@Id, @NombreCompleto, @Telefono, @TipoComprador, @Departamento, @Municipio, @Direccion, @FotoPerfil)`);
    } else {
      await pool.request()
        .input('Id', sql.UniqueIdentifier, user.Id)
        .input('NombreNegocio', sql.NVarChar(255), fullName || email)
        .input('Descripcion', sql.NVarChar(sql.MAX), null)
        .input('Ubicacion', sql.NVarChar(500), location || null)
        .input('Departamento', sql.NVarChar(120), departamento)
        .input('Municipio', sql.NVarChar(120), municipio)
        .input('Direccion', sql.NVarChar(250), direccion || null)
        .input('FotoPerfil', sql.NVarChar(500), fotoPerfil || null)
        .query(`IF EXISTS (SELECT 1 FROM dbo.Productores WHERE Id = @Id)
          UPDATE dbo.Productores
          SET NombreNegocio = @NombreNegocio, Ubicacion = @Ubicacion,
              Departamento = @Departamento, Municipio = @Municipio, Direccion = @Direccion, FotoPerfil = @FotoPerfil
          WHERE Id = @Id
        ELSE
          INSERT INTO dbo.Productores
            (Id, NombreNegocio, Descripcion, Ubicacion, Departamento, Municipio, Direccion, FotoPerfil)
          VALUES (@Id, @NombreNegocio, @Descripcion, @Ubicacion, @Departamento, @Municipio, @Direccion, @FotoPerfil)`);
    }

    await query('UPDATE dbo.Usuarios SET TipoRol = @TipoRol WHERE Id = @UserId', {
      TipoRol: tipoRol,
      UserId: user.Id
    });

    return res.json({
      success: true,
      message: 'Perfil completado correctamente',
      user: {
        id: user.Id,
        email: user.Email,
        tipoRol: tipoRol,
        activo: user.Activo
      }
    });
  } catch (err) {
    console.error('Complete profile error', {
      url: req.originalUrl,
      method: req.method,
      email,
      userId
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
