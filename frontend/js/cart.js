window.renderCart = function () {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const container = document.getElementById('cart');
  const totalEl = document.getElementById('total');

  if (!cart.length) {
    container.innerHTML = '<p>Cart is empty</p>';
    if (totalEl) totalEl.innerText = '';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <h3>${item.title}</h3>
        <p>₹ ${item.price} × ${item.qty}</p>
        <button onclick="updateQty('${item._id}', 1)">+</button>
        <button onclick="updateQty('${item._id}', -1)">-</button>
        <button onclick="removeItem('${item._id}')">Remove</button>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.innerText = `Total: ₹ ${total}`;
};

window.updateQty = function (id, delta) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.map(item => {
    if (item._id === id) item.qty = Math.max(1, item.qty + delta);
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
};

window.removeItem = function (id) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter(item => item._id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
};

window.checkout = async function () {
  const token = localStorage.getItem('token');
  if (!token) return alert('Please login first');

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const res = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ items: cart, total })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message || 'Checkout failed');

  localStorage.removeItem('cart');
  alert('Order placed successfully!');
  window.location.href = 'orders.html';
};