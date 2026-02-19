const API_BASE = 'http://localhost:5000/api/auth';

// REGISTER
window.registerUser = async function (e) {
  e.preventDefault();

  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Registration failed');
      return;
    }

    localStorage.setItem('token', data.token);
    alert('Registration successful!');
    window.location.href = 'login.html';
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
};

// LOGIN
window.loginUser = async function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login failed');
      return;
    }

    localStorage.setItem('token', data.token);
    alert('Login successful!');
    window.location.href = 'index.html';
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
};

// LOGOUT
window.logoutUser = function () {
  localStorage.removeItem('token');
  alert('Logged out!');
  window.location.href = 'login.html';
};

// PROTECTED PAGE CHECK
window.checkAuth = async function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    }
  } catch (err) {
    console.error(err);
    window.location.href = 'login.html';
  }
};