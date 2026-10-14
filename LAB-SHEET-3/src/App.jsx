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
