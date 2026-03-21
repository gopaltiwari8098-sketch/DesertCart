const API_PRODUCTS = 'http://localhost:5000/api/products';
let ALL_PRODUCTS = [];

window.loadProducts = async function () {
  const container = document.getElementById('products');
  container.innerHTML = 'Loading products...';

  try {
    const res = await fetch(API_PRODUCTS);
    const products = await res.json();
    ALL_PRODUCTS = products;
    renderProducts(products);
  } catch (e) {
    console.error(e);
    container.innerHTML = 'Failed to load products';
  }
};

function renderProducts(list) {
  const container = document.getElementById('products');
  container.innerHTML = list.map(p => `
    <div class="card" onclick="goToProduct('${p._id}')">
      <img src="${p.image || 'https://picsum.photos/300'}" />
      <h3>${p.title}</h3>
      <p class="price">₹ ${p.price}</p>
      <button onclick='event.stopPropagation(); addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
  `).join('');
}

window.filterProducts = function () {
  const q = document.getElementById('search').value.toLowerCase();
  const filtered = ALL_PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    (p.category && p.category.toLowerCase().includes(q))
  );
  renderProducts(filtered);
};

window.goToProduct = function (id) {
  window.location.href = `product.html?id=${id}`;
};
