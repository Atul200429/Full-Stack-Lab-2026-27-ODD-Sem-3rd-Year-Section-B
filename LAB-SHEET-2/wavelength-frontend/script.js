/* ==========================================================================
   Wavelength — script.js
   Lab Sheet 2 (Phase 3): cart logic, dynamic rendering, form validation.
   Vanilla JS only — no frameworks, no build step.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Product catalog (>= 8 products: id, name, price, image, category)
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: 1,
    name: "Drift ANC Headphones",
    price: 6499,
    category: "Over-ear",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=70",
    description:
      "40 hours of playback, hybrid active noise cancelling, and a headband soft enough to forget you're wearing it four hours in. Pairs to two devices at once."
  },
  {
    id: 2,
    name: "Pulse True Wireless",
    price: 2999,
    category: "Earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=70",
    description:
      "Compact true-wireless earbuds with a 28-hour case battery, IPX4 sweat resistance, and punchy bass tuned for daily commutes."
  },
  {
    id: 3,
    name: "Basecamp Mini Speaker",
    price: 3299,
    category: "Speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=70",
    description:
      "A pocket-sized bluetooth speaker with 12 hours of playtime and a rugged, splash-proof shell built for the outdoors."
  },
  {
    id: 4,
    name: "Studio Line Open-Back",
    price: 8999,
    category: "Studio",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=70",
    description:
      "Open-back studio headphones for critical listening — wide soundstage, neutral tuning, detachable cable."
  },
  {
    id: 5,
    name: "Commute Folding Headphones",
    price: 2199,
    category: "On-ear",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=70",
    description:
      "Lightweight, foldable on-ear headphones built for the daily commute — 30 hour battery and a compact carry pouch."
  },
  {
    id: 6,
    name: "Reef Sport Earbuds",
    price: 1799,
    category: "Earbuds",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=70",
    description:
      "Waterproof (IPX7) sport earbuds with ear-hooks that stay put through runs, sets, and everything in between."
  },
  {
    id: 7,
    name: "Anchor Bookshelf Pair",
    price: 11499,
    category: "Speaker",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=70",
    description:
      "Powered bookshelf speakers with a warm, room-filling sound — Bluetooth, AUX and USB-C inputs."
  },
  {
    id: 8,
    name: "Signal Studio Monitors",
    price: 5499,
    category: "Studio",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=70",
    description:
      "Wired studio monitor headphones built for mixing — flat response and a coiled cable that won't tangle."
  }
];

const CART_KEY = "wavelength_cart";

/* --------------------------------------------------------------------------
   2. Cart persistence (localStorage)
   cart is stored as an array of { id, qty }
   -------------------------------------------------------------------------- */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read cart from localStorage:", err);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === Number(id));

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: Number(id), qty });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== Number(id));
  saveCart(cart);
  renderCart();
}

function updateCartItemQty(id, qty) {
  qty = Math.max(1, Number(qty) || 1);
  const cart = getCart();
  const item = cart.find((item) => item.id === Number(id));
  if (item) item.qty = qty;
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

/* --------------------------------------------------------------------------
   3. Cart badge — runs on every page
   -------------------------------------------------------------------------- */
function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.qty, 0);
  document.querySelectorAll(".nav-cart strong").forEach((el) => {
    el.textContent = count;
  });
}

/* --------------------------------------------------------------------------
   4. products.html — dynamic product grid
   -------------------------------------------------------------------------- */
function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <article class="product-card">
      <div class="thumb"><img src="${p.image}" alt="${p.name}"></div>
      <span class="cat">${p.category}</span>
      <h3>${p.name}</h3>
      <div class="price-row">
        <span class="price">₹${p.price.toLocaleString("en-IN")}</span>
        <button class="btn btn-primary add-to-cart-btn" type="button" data-id="${p.id}">Add to Cart</button>
      </div>
    </article>
  `
  ).join("");

  grid.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id, 1);
      const original = btn.textContent;
      btn.textContent = "Added ✓";
      setTimeout(() => (btn.textContent = original), 900);
    });
  });
}

/* --------------------------------------------------------------------------
   5. cart.html — dynamic cart table + calculateTotal()
   -------------------------------------------------------------------------- */
function calculateTotal() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => {
    const product = findProduct(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
  const shipping = cart.length > 0 ? 99 : 0;
  return { subtotal, shipping, total: subtotal + shipping };
}

function renderCart() {
  const tbody = document.getElementById("cart-body");
  if (!tbody) return; // not on cart.html

  const cart = getCart();
  const emptyState = document.getElementById("cart-empty");
  const tableEl = document.getElementById("cart-table");
  const summaryEl = document.getElementById("cart-summary-block");

  if (cart.length === 0) {
    if (tableEl) tableEl.style.display = "none";
    if (summaryEl) summaryEl.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (tableEl) tableEl.style.display = "table";
  if (summaryEl) summaryEl.style.display = "grid";
  if (emptyState) emptyState.style.display = "none";

  tbody.innerHTML = cart
    .map((item) => {
      const p = findProduct(item.id);
      if (!p) return "";
      const subtotal = p.price * item.qty;
      return `
        <tr data-row-id="${p.id}">
          <td>
            <div class="cart-item-name">
              <div class="thumb-sm"><img src="${p.image}" alt="${p.name}"></div>
              <div class="meta">
                <span class="cat">${p.category}</span>
                <div>${p.name}</div>
              </div>
            </div>
          </td>
          <td>₹${p.price.toLocaleString("en-IN")}</td>
          <td>
            <input
              type="number"
              class="cart-qty-input"
              min="1"
              max="20"
              value="${item.qty}"
              data-id="${p.id}"
              aria-label="Quantity for ${p.name}"
            >
          </td>
          <td>₹${subtotal.toLocaleString("en-IN")}</td>
          <td>
            <button type="button" class="btn btn-ghost remove-item-btn" data-id="${p.id}">Remove</button>
          </td>
        </tr>
      `;
    })
    .join("");

  const cartCountLabel = document.getElementById("cart-count-label");
  const itemCount = cart.reduce((n, item) => n + item.qty, 0);
  if (cartCountLabel) {
    cartCountLabel.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"} — review before you check out.`;
  }

  const { subtotal, shipping, total } = calculateTotal();
  const grandTotalCell = document.getElementById("grand-total-cell");
  const summarySubtotal = document.getElementById("summary-subtotal");
  const summaryShipping = document.getElementById("summary-shipping");
  const summaryTotal = document.getElementById("summary-total");

  if (grandTotalCell) grandTotalCell.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  if (summarySubtotal) summarySubtotal.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  if (summaryShipping) summaryShipping.textContent = `₹${shipping.toLocaleString("en-IN")}`;
  if (summaryTotal) summaryTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

  tbody.querySelectorAll(".cart-qty-input").forEach((input) => {
    input.addEventListener("change", () => {
      updateCartItemQty(input.dataset.id, input.value);
    });
  });

  tbody.querySelectorAll(".remove-item-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.id);
    });
  });
}

/* --------------------------------------------------------------------------
   6. product-detail.html — wire up its single Add to Cart button
   -------------------------------------------------------------------------- */
function initProductDetail() {
  const btn = document.getElementById("detail-add-to-cart");
  if (!btn) return;

  const qtyInput = document.getElementById("qty");
  const decreaseBtn = document.getElementById("qty-decrease");
  const increaseBtn = document.getElementById("qty-increase");

  if (decreaseBtn && qtyInput) {
    decreaseBtn.addEventListener("click", () => {
      qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
    });
  }
  if (increaseBtn && qtyInput) {
    increaseBtn.addEventListener("click", () => {
      qtyInput.value = Math.min(10, Number(qtyInput.value) + 1);
    });
  }

  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const qty = qtyInput ? Math.max(1, Number(qtyInput.value) || 1) : 1;
    addToCart(id, qty);
    const original = btn.textContent;
    btn.textContent = "Added to cart ✓";
    setTimeout(() => (btn.textContent = original), 1000);
  });
}

/* --------------------------------------------------------------------------
   7. checkout.html — validation + confirmation
   -------------------------------------------------------------------------- */
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const wrapper = field ? field.closest(".field") : null;
  const errorEl = document.getElementById(fieldId + "-error");
  if (wrapper) wrapper.classList.add("error");
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const wrapper = field ? field.closest(".field") : null;
  const errorEl = document.getElementById(fieldId + "-error");
  if (wrapper) wrapper.classList.remove("error");
  if (errorEl) errorEl.textContent = "";
}

function validateCheckoutForm() {
  let isValid = true;
  const name = document.getElementById("name");
  const address = document.getElementById("address");
  const pincode = document.getElementById("pincode");
  const phone = document.getElementById("phone");

  ["name", "address", "pincode", "phone"].forEach(clearFieldError);

  if (!name.value.trim()) {
    showFieldError("name", "Please enter your full name.");
    isValid = false;
  }

  if (!address.value.trim()) {
    showFieldError("address", "Please enter your delivery address.");
    isValid = false;
  }

  if (!/^\d{6}$/.test(pincode.value.trim())) {
    showFieldError("pincode", "Pincode must be exactly 6 digits.");
    isValid = false;
  }

  if (!/^\d{10}$/.test(phone.value.trim())) {
    showFieldError("phone", "Phone number must be exactly 10 digits.");
    isValid = false;
  }

  return isValid;
}

function renderOrderSummary() {
  const list = document.getElementById("order-summary-list");
  if (!list) return;

  const cart = getCart();
  if (cart.length === 0) {
    list.innerHTML = "<li><span>Your cart is empty</span><span>—</span></li>";
  } else {
    list.innerHTML = cart
      .map((item) => {
        const p = findProduct(item.id);
        if (!p) return "";
        return `<li><span>${p.name} × ${item.qty}</span><span>₹${(p.price * item.qty).toLocaleString("en-IN")}</span></li>`;
      })
      .join("");
  }

  const { subtotal, shipping, total } = calculateTotal();
  const subtotalEl = document.getElementById("checkout-subtotal");
  const shippingEl = document.getElementById("checkout-shipping");
  const totalEl = document.getElementById("checkout-total");
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  if (shippingEl) shippingEl.textContent = `₹${shipping.toLocaleString("en-IN")}`;
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
}

function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  renderOrderSummary();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateCheckoutForm()) return;

    form.style.display = "none";
    const confirmation = document.getElementById("order-confirmation");
    if (confirmation) confirmation.style.display = "block";

    clearCart();
    renderOrderSummary();
  });

  // clear a field's error as soon as the user starts fixing it
  ["name", "address", "pincode", "phone"].forEach((id) => {
    const field = document.getElementById(id);
    if (field) field.addEventListener("input", () => clearFieldError(id));
  });
}

/* --------------------------------------------------------------------------
   8. Bootstrap — runs on every page
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderProducts();
  renderCart();
  initProductDetail();
  initCheckoutForm();
});
