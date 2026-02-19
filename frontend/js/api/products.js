const API_PRODUCTS = 'http://localhost:5000/api/products';

window.loadProducts = async function () {
  const container = document.getElementById('products');
  container.innerHTML = 'Loading products...';

  try {
    const res = await fetch(API_PRODUCTS);
    const products = await res.json();

    container.innerHTML = products.map(p => `
      <div class="card">
        <img src="${p.image || 'https://picsum.photos/300'}" />
        <h3>${p.title}</h3>
        <p>₹ ${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
    container.innerHTML = 'Failed to load products';
  }
};

window.addToCart = function (product) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const existing = cart.find(item => item._id === product._id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
};