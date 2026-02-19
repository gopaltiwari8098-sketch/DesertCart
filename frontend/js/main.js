const API_PRODUCTS = 'http://localhost:5000/api/products';

window.loadProducts = async function () {
  const container = document.getElementById('products');
  container.innerHTML = 'Loading products...';

  try {
    const res = await fetch(API_PRODUCTS);
    const products = await res.json();

    container.innerHTML = products.map(p => `
      <div class="card" onclick="goToProduct('${p._id}')">
        <img src="${p.image || 'https://picsum.photos/300'}" />
        <h3>${p.title}</h3>
        <p class="price">₹ ${p.price}</p>
        <button onclick='event.stopPropagation(); addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
    container.innerHTML = 'Failed to load products';
  }
};

window.goToProduct = function (id) {
  window.location.href = `product.html?id=${id}`;
};
