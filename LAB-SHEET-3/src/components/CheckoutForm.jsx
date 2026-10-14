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
