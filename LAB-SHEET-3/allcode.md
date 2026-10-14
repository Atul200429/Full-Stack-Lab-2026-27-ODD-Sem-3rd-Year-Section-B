/**
* Cart — receives cart array and removeFromCart / updateQuantity via props.
* Conditional rendering: empty message vs. table + totals.
*/
function Cart({ cart, onRemove, onUpdateQty, onCheckout }) {
  const itemCount = cart.reduce((n, item) => n + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Your cart</h2>
              <p>0 items — review before you check out.</p>
            </div>
          </div>
          <div className="summary-card" style={{ textAlign: "center" }}>
            <p style={{ marginBottom: 18 }}>Your cart is empty.</p>
            <p className="empty-note">
              Browse the catalogue and add something you like.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 56 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Your cart</h2>
            <p>
              {itemCount} item{itemCount === 1 ? "" : "s"} — review before you
              check out.
            </p>
          </div>
        </div>

        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const lineTotal = item.product.price * item.quantity;
              return (
                <tr key={item.product.id}>
                  <td>
                    <div className="cart-item-name">
                      <div className="thumb-sm">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                        />
                      </div>
                      <div className="meta">
                        <span className="cat">{item.product.category}</span>
                        <div>{item.product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>₹{item.product.price.toLocaleString("en-IN")}</td>
                  <td>
                    <input
                      type="number"
                      className="cart-qty-input"
                      min={1}
                      max={20}
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateQty(
                          item.product.id,
                          Number(e.target.value) || 1
                        )
                      }
                      aria-label={`Quantity for ${item.product.name}`}
                    />
                  </td>
                  <td>₹{lineTotal.toLocaleString("en-IN")}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-ghost remove-item-btn"
                      onClick={() => onRemove(item.product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="grand-total">
              <td colSpan={4}>Grand total</td>
              <td>₹{subtotal.toLocaleString("en-IN")}</td>
            </tr>
          </tfoot>
        </table>

        <div className="cart-summary">
          <div>
            <p className="empty-note">
              Prices include GST. Shipping is calculated at checkout.
            </p>
          </div>
          <div className="summary-card">
            <div className="row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="row">
              <span>Shipping</span>
              <span>₹{shipping.toLocaleString("en-IN")}</span>
            </div>
            <div className="row total">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              style={{ marginTop: 18 }}
              onClick={onCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;

/**
 * CheckoutForm — controlled inputs (value + onChange tied to useState)
 * for Name, Address, City, Pincode, Phone, and Payment Method.
 * Validates on submit and shows confirmation.
 */
import { useState } from "react";

function CheckoutForm({ cart, onOrderPlaced }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    payment: "upi",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.address.trim())
      next.address = "Please enter your delivery address.";
    if (!/^\d{6}$/.test(form.pincode.trim()))
      next.pincode = "Pincode must be exactly 6 digits.";
    if (!/^\d{10}$/.test(form.phone.trim()))
      next.phone = "Phone number must be exactly 10 digits.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    onOrderPlaced();
  }

  if (submitted) {
    return (
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="confirmation-banner">
            <h2>Order placed! 🎉</h2>
            <p>
              Thanks — your order has been received and your cart has been
              cleared. We&apos;ll text you shipping updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 56 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Checkout</h2>
            <p>Tell us where it&apos;s going and how you&apos;ll pay.</p>
          </div>
        </div>

        <div className="checkout-grid">
          <div className="form-card">
            <h2>Delivery details</h2>
            <p>We&apos;ll text you when the order ships.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className={`field full ${errors.name ? "error" : ""}`}>
                  <label htmlFor="name">Full name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Atul Sharma"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="error-msg">{errors.name}</span>
                  )}
                </div>

                <div className={`field full ${errors.address ? "error" : ""}`}>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="House no., street, landmark"
                    value={form.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <span className="error-msg">{errors.address}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Roorkee"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>

                <div className={`field ${errors.pincode ? "error" : ""}`}>
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="247667"
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && (
                    <span className="error-msg">{errors.pincode}</span>
                  )}
                </div>

                <div className={`field full ${errors.phone ? "error" : ""}`}>
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="9876543210"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="error-msg">{errors.phone}</span>
                  )}
                </div>

                <div className="field full">
                  <fieldset>
                    <legend>Payment method</legend>
                    <div className="payment-options">
                      {[
                        { value: "upi", label: "UPI" },
                        { value: "card", label: "Credit / Debit card" },
                        { value: "netbanking", label: "Net banking" },
                        { value: "cod", label: "Cash on delivery" },
                      ].map((opt) => (
                        <label key={opt.value}>
                          <input
                            type="radio"
                            name="payment"
                            value={opt.value}
                            checked={form.payment === opt.value}
                            onChange={handleChange}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-block">
                  Place Order
                </button>
              </div>
            </form>
          </div>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <ul>
              {cart.length === 0 ? (
                <li>
                  <span>Your cart is empty</span>
                  <span>—</span>
                </li>
              ) : (
                cart.map((item) => (
                  <li key={item.product.id}>
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                      ₹
                      {(item.product.price * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div
              className="summary-card"
              style={{ padding: 0, border: "none", background: "none" }}
            >
              <div className="row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="row">
                <span>Shipping</span>
                <span>₹{shipping.toLocaleString("en-IN")}</span>
              </div>
              <div className="row total">
                <span>Total due</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CheckoutForm;

/**
 * Shared footer — brand, shop links, contact.
 */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <span className="wave-mark" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
              Wavelength
            </a>
            <p>
              A small audio gear shop based in Roorkee, shipping across India.
            </p>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li>
                <a href="#products">All products</a>
              </li>
              <li>
                <a href="#home">Featured</a>
              </li>
              <li>
                <a href="#cart">Your cart</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>krishnaatul24@gmail.com</li>
              <li>+91 7367012183</li>
              <li>Patna, Bihar, IN</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Wavelength Audio. All rights reserved.</span>
          <span>Mini E-Commerce Project — Lab Sheet 3 (React)</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/**
 * Header / navbar — brand, nav links, cart toggle with badge.
 */
function Header({ cartCount, cartOpen, onToggleCart, onNavigate }) {
  return (
    <header className="site-header">
      <div className="navbar">
        <a
          href="#home"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
        >
          <span className="wave-mark" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          Wavelength
        </a>

        <nav aria-label="Primary">
          <ul className="nav-links">
            <li>
              <a
                href="#home"
                className={cartOpen ? "" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("home");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("products");
                }}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#cart"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("cart");
                }}
              >
                Cart
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="nav-cart"
          onClick={onToggleCart}
          aria-expanded={cartOpen}
          aria-label="Toggle cart"
        >
          🛒 Cart <strong>{cartCount}</strong>
        </button>
      </div>
    </header>
  );
}

export default Header;

/**
 * Hero banner for the home view.
 */
function Hero({ onShop }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">New arrivals every Friday</p>
        <h1>Sound gear picked for people who actually listen close.</h1>
        <p>
          Wavelength is a small, Roorkee-run shop for headphones, earbuds and
          speakers that are built to be used daily — not just unboxed once for a
          review video.
        </p>
        <div className="hero-buttons">
          <button type="button" className="btn btn-primary" onClick={onShop}>
            Shop all products
          </button>
          <a href="#featured" className="btn btn-ghost">
            See featured picks
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=75"
          alt="Featured headphones"
        />
      </div>
    </section>
  );
}

export default Hero;

/**
 * ProductCard — receives a single product + addToCart via props.
 * Renders image, category, name, price, and Add to Cart button.
 */
function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="thumb">
        <img src={product.image} alt={product.name} />
      </div>
      <span className="cat">{product.category}</span>
      <h3>{product.name}</h3>
      <div className="price-row">
        <span className="price">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

/**
 * ProductList — imports products, maps over them, renders ProductCard
 * with a unique key (product.id, never array index).
 */
import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList({ onAddToCart }) {
  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>All products</h2>
            <p>Eight pieces of gear, four categories, zero filler.</p>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;

/**
 * Wavelength product catalog — temporary mock data source (Lab Sheet 3).
 * Each product has: id, name, price, image, category, description.
 */
const products = [
  {
    id: 1,
    name: "Drift ANC Headphones",
    price: 6499,
    category: "Over-ear",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=70",
    description:
      "40 hours of playback, hybrid active noise cancelling, and a headband soft enough to forget you're wearing it four hours in. Pairs to two devices at once.",
  },
  {
    id: 2,
    name: "Pulse True Wireless",
    price: 2999,
    category: "Earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=70",
    description:
      "Compact true-wireless earbuds with a 28-hour case battery, IPX4 sweat resistance, and punchy bass tuned for daily commutes.",
  },
  {
    id: 3,
    name: "Basecamp Mini Speaker",
    price: 3299,
    category: "Speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=70",
    description:
      "A pocket-sized bluetooth speaker with 12 hours of playtime and a rugged, splash-proof shell built for the outdoors.",
  },
  {
    id: 4,
    name: "Studio Line Open-Back",
    price: 8999,
    category: "Studio",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=70",
    description:
      "Open-back studio headphones for critical listening — wide soundstage, neutral tuning, detachable cable.",
  },
  {
    id: 5,
    name: "Commute Folding Headphones",
    price: 2199,
    category: "On-ear",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=70",
    description:
      "Lightweight, foldable on-ear headphones built for the daily commute — 30 hour battery and a compact carry pouch.",
  },
  {
    id: 6,
    name: "Reef Sport Earbuds",
    price: 1799,
    category: "Earbuds",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=70",
    description:
      "Waterproof (IPX7) sport earbuds with ear-hooks that stay put through runs, sets, and everything in between.",
  },
  {
    id: 7,
    name: "Anchor Bookshelf Pair",
    price: 11499,
    category: "Speaker",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=70",
    description:
      "Powered bookshelf speakers with a warm, room-filling sound — Bluetooth, AUX and USB-C inputs.",
  },
  {
    id: 8,
    name: "Signal Studio Monitors",
    price: 5499,
    category: "Studio",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=70",
    description:
      "Wired studio monitor headphones built for mixing — flat response and a coiled cable that won't tangle.",
  },
];

export default products;

/**
 * App — top-level component.
 * Cart state lives here (lifted up) and is passed down via props.
 * view state controls which section is shown; cartOpen toggles cart panel.
 */
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import products from "./data/products";

function App() {
  // cart: array of { product, quantity }
  const [cart, setCart] = useState([]);
  // which main view is active
  const [view, setView] = useState("home"); // "home" | "products" | "cart" | "checkout"
  // simple show/hide for cart from navbar badge
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((n, item) => n + item.quantity, 0);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    const qty = Math.max(1, Number(quantity) || 1);
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function handleNavigate(next) {
    setView(next);
    setCartOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleToggleCart() {
    setCartOpen((open) => !open);
    if (!cartOpen) {
      setView("cart");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleCheckout() {
    setView("checkout");
    setCartOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleOrderPlaced() {
    clearCart();
  }

  const featured = products.slice(0, 4);

  return (
    <>
      <Header
        cartCount={cartCount}
        cartOpen={cartOpen}
        onToggleCart={handleToggleCart}
        onNavigate={handleNavigate}
      />

      <main>
        {view === "home" && (
          <>
            <Hero onShop={() => handleNavigate("products")} />

            <section className="section" id="featured">
              <div className="container">
                <div className="section-head">
                  <div>
                    <h2>Featured this week</h2>
                    <p>
                      A short list, updated often, of what&apos;s actually
                      worth your money right now.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => handleNavigate("products")}
                  >
                    View full catalogue
                  </button>
                </div>
                <div className="product-grid">
                  {featured.map((product) => (
                    <article className="product-card" key={product.id}>
                      <div className="thumb">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <span className="cat">{product.category}</span>
                      <h3>{product.name}</h3>
                      <div className="price-row">
                        <span className="price">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => addToCart(product)}
                        >
                          Add
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {view === "products" && <ProductList onAddToCart={addToCart} />}

        {view === "cart" && (
          <Cart
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQty={updateQuantity}
            onCheckout={handleCheckout}
          />
        )}

        {view === "checkout" && (
          <CheckoutForm cart={cart} onOrderPlaced={handleOrderPlaced} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;

/* ==========================================================================
   Wavelength — boutique audio gear storefront
   Design tokens
   ========================================================================== */
:root {
  --bg: #14161b;
  --bg-raised: #1c1f26;
  --paper: #f3efe6;
  --ink: #ede9e0;
  --ink-soft: #9aa0ab;
  --accent: #e8a33d;
  --accent-soft: #6b5730;
  --accent-2: #6e8f73;
  --line: rgba(237, 233, 224, 0.12);
  --line-strong: rgba(237, 233, 224, 0.24);
  --radius: 14px;
  --radius-sm: 8px;
  --font-display: "Space Grotesk", "Segoe UI", sans-serif;
  --font-body: "Inter", "Segoe UI", sans-serif;
  --shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.15;
  margin: 0 0 0.5em;
  letter-spacing: -0.01em;
}

p {
  margin: 0 0 1em;
  color: var(--ink-soft);
}

.container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* --------------------------------------------------------------------------
   Signature mark — waveform bars, echoed in header, hero and footer
   -------------------------------------------------------------------------- */
.wave-mark {
  display: inline-flex;
  align-items: flex-end;
  gap: 3px;
  height: 22px;
}

.wave-mark span {
  width: 4px;
  background: var(--accent);
  border-radius: 2px;
  animation: wave 1.6s ease-in-out infinite;
}

.wave-mark span:nth-child(1) { height: 40%; animation-delay: -1.2s; }
.wave-mark span:nth-child(2) { height: 100%; animation-delay: -0.9s; }
.wave-mark span:nth-child(3) { height: 60%; animation-delay: -0.6s; }
.wave-mark span:nth-child(4) { height: 85%; animation-delay: -0.3s; }
.wave-mark span:nth-child(5) { height: 50%; animation-delay: 0s; }

@keyframes wave {
  0%, 100% { transform: scaleY(0.55); }
  50% { transform: scaleY(1); }
}

@media (prefers-reduced-motion: reduce) {
  .wave-mark span { animation: none; }
}

/* --------------------------------------------------------------------------
   Header / navbar (Flexbox)
   -------------------------------------------------------------------------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(20, 22, 27, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand span.tagline {
  display: none;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}

.nav-links a {
  font-size: 0.92rem;
  color: var(--ink-soft);
  padding: 6px 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--ink);
  border-color: var(--accent);
}

.nav-cart {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-raised);
  border: 1px solid var(--line-strong);
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.nav-cart:hover {
  border-color: var(--accent);
}

.nav-toggle {
  display: none;
}

/* --------------------------------------------------------------------------
   Hero
   -------------------------------------------------------------------------- */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 60px 24px;
  max-width: 1180px;
  margin: 0 auto;
}

.hero-text {
  flex: 1;
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.hero-text p {
  font-size: 1rem;
  max-width: 480px;
}

.hero-buttons {
  display: flex;
  gap: 14px;
  margin-top: 20px;
}

.hero-image {
  flex: 1;
  border-radius: var(--radius);
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  border-radius: var(--radius);
}

/* --------------------------------------------------------------------------
   Buttons
   -------------------------------------------------------------------------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.92rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
}

.btn:active {
  transform: translateY(1px);
}

.btn-primary {
  background: var(--accent);
  color: #17140c;
}

.btn-primary:hover {
  background: #f0b25a;
}

.btn-ghost {
  background: transparent;
  border-color: var(--line-strong);
  color: var(--ink);
}

.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.btn-block {
  width: 100%;
}

/* --------------------------------------------------------------------------
   Sections
   -------------------------------------------------------------------------- */
.section {
  padding: 72px 24px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.section-head h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}

.section-head p {
  margin: 0;
}

/* --------------------------------------------------------------------------
   Product grid & cards
   -------------------------------------------------------------------------- */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.product-card {
  background: var(--bg-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.product-card:hover {
  border-color: var(--line-strong);
  transform: translateY(-4px);
}

.product-card .thumb {
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-sm);
  background: linear-gradient(150deg, #24272f, #14161b);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-card .thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card .cat {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-2);
}

.product-card h3 {
  font-size: 1.02rem;
  margin: 0;
}

.product-card .price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.price {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--ink);
}

.price .strike {
  color: var(--ink-soft);
  text-decoration: line-through;
  font-size: 0.85rem;
  font-weight: 400;
  margin-left: 6px;
}

/* --------------------------------------------------------------------------
   Product detail page
   -------------------------------------------------------------------------- */
.detail-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 56px;
  align-items: start;
}

.detail-gallery {
  aspect-ratio: 1 / 1;
  border-radius: var(--radius);
  background: linear-gradient(150deg, #24272f, #14161b);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.detail-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-info .cat {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-2);
  margin-bottom: 10px;
  display: block;
}

.detail-info h1 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
}

.detail-price {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--accent);
  margin: 10px 0 20px;
}

.detail-desc {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 20px 0;
  margin: 20px 0;
}

.qty-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  overflow: hidden;
  margin-right: 14px;
}

.qty-selector button {
  background: transparent;
  border: none;
  color: var(--ink);
  width: 40px;
  height: 42px;
  font-size: 1.1rem;
  cursor: pointer;
}

.qty-selector button:hover {
  background: var(--bg-raised);
}

.qty-selector input {
  width: 44px;
  text-align: center;
  background: transparent;
  border: none;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 1rem;
}

.detail-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.spec-list {
  list-style: none;
  padding: 0;
  margin: 18px 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 24px;
  font-size: 0.9rem;
}

.spec-list li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed var(--line);
  padding-bottom: 8px;
  color: var(--ink-soft);
}

.spec-list li strong {
  color: var(--ink);
  font-weight: 500;
}

/* --------------------------------------------------------------------------
   Cart page
   -------------------------------------------------------------------------- */
.cart-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}

.cart-table th,
.cart-table td {
  padding: 16px 18px;
  text-align: left;
  border-bottom: 1px solid var(--line);
}

.cart-table thead th {
  font-family: var(--font-display);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.02);
}

.cart-item-name {
  display: flex;
  align-items: center;
  gap: 14px;
}

.cart-item-name .thumb-sm {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  background: linear-gradient(150deg, #24272f, #14161b);
  overflow: hidden;
  flex-shrink: 0;
}

.cart-item-name .thumb-sm img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-name .meta .cat {
  font-size: 0.7rem;
  color: var(--accent-2);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cart-table tfoot td {
  border-bottom: none;
}

.cart-table tfoot tr.grand-total td {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  padding-top: 20px;
}

.cart-summary {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 40px;
  align-items: start;
  margin-top: 20px;
}

.summary-card {
  background: var(--bg-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 24px;
}

.summary-card .row {
  display: flex;
  justify-content: space-between;
  font-size: 0.92rem;
  padding: 8px 0;
  color: var(--ink-soft);
}

.summary-card .row.total {
  border-top: 1px solid var(--line);
  margin-top: 8px;
  padding-top: 16px;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
}

.empty-note {
  color: var(--ink-soft);
  font-size: 0.85rem;
  margin-top: 10px;
}

/* --------------------------------------------------------------------------
   Checkout form
   -------------------------------------------------------------------------- */
.checkout-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: start;
}

.form-card {
  background: var(--bg-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 32px;
}

.form-card h2 {
  font-size: 1.2rem;
  margin-bottom: 6px;
}

.form-card > p {
  margin-bottom: 26px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field.full {
  grid-column: 1 / -1;
}

.field label {
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.field input,
.field select,
.field textarea {
  background: var(--bg);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 0.95rem;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
  background: #191c22;
}

.field input::placeholder {
  color: #5c6270;
}

fieldset {
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  padding: 16px;
  margin: 0;
}

fieldset legend {
  padding: 0 8px;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-options label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.92rem;
  cursor: pointer;
}

.payment-options input[type="radio"] {
  accent-color: var(--accent);
  width: 16px;
  height: 16px;
}

.form-actions {
  margin-top: 26px;
}

.order-summary {
  background: var(--bg-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 26px;
}

.order-summary h2 {
  font-size: 1.05rem;
}

.order-summary ul {
  list-style: none;
  padding: 0;
  margin: 18px 0;
}

.order-summary li {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--ink-soft);
  padding: 8px 0;
  border-bottom: 1px dashed var(--line);
}

/* --------------------------------------------------------------------------
   Footer
   -------------------------------------------------------------------------- */
.site-footer {
  border-top: 1px solid var(--line);
  padding: 56px 24px 28px;
  margin-top: 40px;
}

.footer-grid {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.footer-brand {
  max-width: 320px;
}

.footer-brand .brand {
  margin-bottom: 12px;
}

.footer-col h4 {
  font-family: var(--font-display);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
  margin-bottom: 14px;
}

.footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9rem;
}

.footer-col a:hover {
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-top: 1px solid var(--line);
  padding-top: 22px;
  font-size: 0.8rem;
  color: var(--ink-soft);
  flex-wrap: wrap;
}

/* --------------------------------------------------------------------------
   JS-driven states — form errors, cart qty/remove, confirmation
   -------------------------------------------------------------------------- */
.error-msg {
  display: none;
  color: #e5757a;
  font-size: 0.78rem;
}

.field.error input {
  border-color: #e5757a;
}

.field.error .error-msg {
  display: block;
}

.cart-qty-input {
  width: 60px;
  background: var(--bg);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 8px 10px;
  text-align: center;
}

.cart-qty-input:focus {
  outline: none;
  border-color: var(--accent);
}

.remove-item-btn {
  padding: 8px 16px;
  font-size: 0.82rem;
}

.confirmation-banner {
  background: var(--bg-raised);
  border: 1px solid var(--accent-2);
  border-radius: var(--radius);
  padding: 32px;
  text-align: center;
}

.confirmation-banner h2 {
  color: var(--accent-2);
  margin-bottom: 10px;
}

.confirmation-banner .btn {
  margin-top: 12px;
}

/* --------------------------------------------------------------------------
   Responsive — mobile-width layout
   -------------------------------------------------------------------------- */
@media (max-width: 860px) {
  .hero {
    flex-direction: column;
  }

  .detail-grid,
  .cart-summary,
  .checkout-grid {
    grid-template-columns: 1fr;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .navbar {
    flex-wrap: wrap;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 20px;
    overflow-x: auto;
    padding-top: 10px;
    border-top: 1px solid var(--line);
    margin-top: 12px;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .cart-table thead {
    display: none;
  }

  .cart-table tr {
    display: grid;
    grid-template-columns: 1fr;
  }

  .cart-table td {
    border-bottom: none;
    padding: 6px 18px;
  }

  .cart-table tr:not(:last-child) {
    border-bottom: 1px solid var(--line);
  }

  .cart-table td:first-child {
    padding-top: 16px;
  }

  .cart-table td:last-child {
    padding-bottom: 16px;
  }

  .footer-grid {
    flex-direction: column;
    gap: 28px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* React-specific: nav-cart is a <button> */
button.nav-cart {
  font: inherit;
  color: inherit;
  cursor: pointer;
}

button.nav-cart strong {
  font-weight: 700;
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wavelength — Audio Gear for People Who Listen Close</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

{
  "name": "wavelength-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "oxlint": "^1.79.0",
    "vite": "^8.2.2"
  }
}

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
