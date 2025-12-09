const products = [
  { id: 1, name: "Ноутбук", price: 32000 },
  { id: 2, name: "Смартфон", price: 18000 },
  { id: 3, name: "Навушники", price: 1500 },
  { id: 4, name: "Клавіатура", price: 900 },
  { id: 5, name: "Мишка", price: 600 },
  { id: 6, name: "Монітор", price: 7500 },
  { id: 7, name: "Флеш-накопичувач", price: 400 },
  { id: 8, name: "Зовнішній диск", price: 2200 },
  { id: 9, name: "Планшет", price: 12000 },
  { id: 10, name: "Колонки", price: 1300 },
  { id: 11, name: "Веб-камера", price: 800 },
  { id: 12, name: "Мікрофон", price: 1100 }
];

const PAGE_SIZE = 6;
let currentPage = 1;

const cart = {};

const productsListEl = document.getElementById("products-list");
const paginationEl = document.getElementById("pagination");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const cartClearBtn = document.getElementById("cart-clear");

function renderProducts() {
  productsListEl.innerHTML = "";

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageItems = products.slice(startIndex, endIndex);

  const fragment = document.createDocumentFragment();

  pageItems.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <h3 class="product-card__title">${product.name}</h3>
      <p class="product-card__price">${product.price} ₴</p>
      <div class="product-card__actions">
        <span class="product-card__badge">ID: ${product.id}</span>
        <button class="btn btn--primary" data-add-id="${product.id}">
          Додати в кошик
        </button>
      </div>
    `;

    fragment.appendChild(card);
  });

  productsListEl.appendChild(fragment);
}

function renderPagination() {
  paginationEl.innerHTML = "";

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  if (totalPages <= 1) {
    return;
  }

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "«";
  prevBtn.className = "pagination__btn";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    currentPage--;
    updateView();
  });
  paginationEl.appendChild(prevBtn);

  for (let page = 1; page <= totalPages; page++) {
    const btn = document.createElement("button");
    btn.textContent = String(page);
    btn.className = "pagination__btn";
    if (page === currentPage) {
      btn.classList.add("pagination__btn--active");
    }
    btn.addEventListener("click", () => {
      currentPage = page;
      updateView();
    });
    paginationEl.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "»";
  nextBtn.className = "pagination__btn";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    currentPage++;
    updateView();
  });
  paginationEl.appendChild(nextBtn);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (!cart[productId]) {
    cart[productId] = { product, quantity: 0 };
  }
  cart[productId].quantity += 1;

  renderCart();
}

function changeQuantity(productId, delta) {
  const item = cart[productId];
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    delete cart[productId];
  }

  renderCart();
}

function clearCart() {
  for (const key in cart) {
    delete cart[key];
  }
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";

  const fragment = document.createDocumentFragment();
  let totalCount = 0;
  let totalPrice = 0;

  Object.values(cart).forEach(({ product, quantity }) => {
    totalCount += quantity;
    totalPrice += product.price * quantity;

    const li = document.createElement("li");
    li.className = "cart-item";

    li.innerHTML = `
      <div class="cart-item__info">
        <p class="cart-item__title">${product.name}</p>
        <p class="cart-item__meta">${product.price} ₴ × ${quantity}</p>
      </div>
      <div class="cart-item__controls">
        <button class="btn btn--ghost" data-dec-id="${product.id}">−</button>
        <span>${quantity}</span>
        <button class="btn btn--ghost" data-inc-id="${product.id}">+</button>
      </div>
    `;

    fragment.appendChild(li);
  });

  cartItemsEl.appendChild(fragment);

  cartCountEl.textContent = totalCount;
  cartTotalEl.textContent = totalPrice;
}

function updateView() {
  renderProducts();
  renderPagination();
}

productsListEl.addEventListener("click", event => {
  const btn = event.target.closest("button[data-add-id]");
  if (!btn) return;

  const id = Number(btn.dataset.addId);
  addToCart(id);
});

cartItemsEl.addEventListener("click", event => {
  const incBtn = event.target.closest("button[data-inc-id]");
  const decBtn = event.target.closest("button[data-dec-id]");

  if (incBtn) {
    const id = Number(incBtn.dataset.incId);
    changeQuantity(id, 1);
  }

  if (decBtn) {
    const id = Number(decBtn.dataset.decId);
    changeQuantity(id, -1);
  }
});

cartClearBtn.addEventListener("click", clearCart);

// Початкове рендерення
updateView();
renderCart();
