const AUTH_API = 'https://desertcart.onrender.com';

export async function apiRegister({ name, email, password }) {
  const res = await fetch(`${AUTH_API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function apiLogin({ email, password }) {
  const res = await fetch(`${AUTH_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function apiMe(token) {
  const res = await fetch(`${AUTH_API}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}