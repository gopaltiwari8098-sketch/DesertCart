import { apiGetProducts } from './api/products.js';

window.loadProducts = async function () {
  const products = await apiGetProducts();
  const container = document.getElementById('products');

  container.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}" />
      <h3>${p.title}</h3>
      <p>₹ ${p.price}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
  `).join('');
};