const test = require('node:test');
const assert = require('node:assert/strict');

const { createAuthToken, verifyAuthToken, buildAuthCookie } = require('./auth');

test('JWT round-trips user data', () => {
  const payload = {
    id: 'user-123',
    email: 'demo@cint.com',
    tipoRol: 2,
    activo: true,
  };

  const token = createAuthToken(payload);
  const decoded = verifyAuthToken(token);

  assert.equal(typeof token, 'string');
  assert.ok(token.length > 20);
  assert.equal(decoded.id, payload.id);
  assert.equal(decoded.email, payload.email);
  assert.equal(decoded.tipoRol, payload.tipoRol);
  assert.equal(decoded.activo, payload.activo);
});

test('buildAuthCookie includes httpOnly and secure flags', () => {
  const cookie = buildAuthCookie('token-value');

  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /SameSite=Lax/i);
  assert.match(cookie, /Path=\//i);
  assert.match(cookie, /token-value/);
});
