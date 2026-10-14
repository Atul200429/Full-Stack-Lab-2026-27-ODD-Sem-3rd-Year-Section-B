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
