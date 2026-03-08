const CART_KEY = "reddysCart";

function getCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cartItems) {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function getProductById(productId) {
  return (window.PRODUCTS || []).find((item) => item.id === productId);
}

function addToCart(productId) {
  const id = Number(productId);
  const product = getProductById(id);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  const id = Number(productId);
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  updateCartCount();
  renderCartPage();
}

function updateQuantity(productId, change) {
  const id = Number(productId);
  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  updateCartCount();
  renderCartPage();
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = String(count);
  });
}

function renderCartPage() {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalNode = document.getElementById("cartTotal");
  if (!cartItemsContainer || !totalNode) return;

  const cart = getCart();
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="color:var(--text-soft);">Your cart is empty. Add products from the shop page.</p>';
    totalNode.textContent = "?0";
    return;
  }

  let total = 0;

  cartItemsContainer.innerHTML = cart
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return "";
      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return `
        <article class="cart-item">
          <img class="cart-thumb" src="${product.image}" alt="${product.name}" />
          <div>
            <h3 style="margin-bottom:0.3rem;">${product.name}</h3>
            <p style="color:var(--primary); font-weight:700; margin-bottom:0.5rem;">?${product.price.toLocaleString("en-IN")}</p>
            <div class="qty-wrap">
              <button class="qty-btn" data-qty-action="decrease" data-product-id="${item.id}">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-qty-action="increase" data-product-id="${item.id}">+</button>
            </div>
          </div>
          <button class="btn btn-soft" data-remove-id="${item.id}">Remove</button>
        </article>
      `;
    })
    .join("");

  totalNode.textContent = `?${total.toLocaleString("en-IN")}`;
}

function bindGlobalCartActions() {
  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-to-cart]");
    if (addButton) {
      addToCart(addButton.dataset.addToCart);
      return;
    }

    const removeButton = event.target.closest("[data-remove-id]");
    if (removeButton) {
      removeFromCart(removeButton.dataset.removeId);
      return;
    }

    const qtyButton = event.target.closest("[data-qty-action]");
    if (qtyButton) {
      const amount = qtyButton.dataset.qtyAction === "increase" ? 1 : -1;
      updateQuantity(qtyButton.dataset.productId, amount);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartPage();
  bindGlobalCartActions();
});
