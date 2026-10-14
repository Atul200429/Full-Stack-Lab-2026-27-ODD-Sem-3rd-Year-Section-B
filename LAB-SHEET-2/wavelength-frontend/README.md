# Wavelength — Mini E-Commerce Storefront

A static, responsive storefront built for **BTCS303P Full Stack Development — Lab Sheet 1 (Building the Storefront: HTML + CSS)**, COER University, Roorkee.

**Store concept:** Wavelength, a small audio-gear shop (headphones, earbuds, speakers).

## Live pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero banner + 4 featured products |
| `products.html` | Full catalogue — 8 products in a responsive grid |
| `product-detail.html` | Single product page — gallery, specs, quantity selector |
| `cart.html` | Cart table — item, price, quantity, subtotal, grand total |
| `checkout.html` | Checkout form — name, address, city, pincode, phone, payment method |
| `style.css` | Shared stylesheet for all five pages |
| `script.js` | Cart logic, dynamic rendering, and form validation (Lab Sheet 2) — linked from all five pages |

## How to view it

No build step needed — it's plain HTML/CSS. Either:

1. Open `index.html` directly in a browser, or
2. From this folder, run a tiny local server and visit the printed URL:
   ```bash
   python3 -m http.server 8000
   # then open http://localhost:8000
   ```

## Lab Sheet 1 checklist

**Part A — HTML Structure (Phase 1)**
- [x] Project folder `wavelength-frontend` with all 5 pages
- [x] Shared `<header>` with store name/logo + `<nav>` (Home, Products, Cart) on every page
- [x] `index.html`: hero/banner + "Featured this week" section with 4 product blocks
- [x] `products.html`: 8 products, each with image, name, price, Add to Cart button
- [x] `product-detail.html`: large image, name, description, price, quantity selector, Add to Cart
- [x] `cart.html`: table with item, quantity, price, subtotal, grand total row
- [x] `checkout.html`: form with Name, Address, City, Pincode, Phone, Payment Method (radio), Place Order button
- [x] Shared `<footer>` with contact info + copyright on every page
- [x] All pages link to each other via the navbar

**Part B — CSS Styling (Phase 2)**
- [x] Single `style.css` linked from all 5 pages
- [x] CSS custom properties for the color theme (`:root { --bg; --accent; --accent-2; ... }`)
- [x] Navbar built with `display: flex`, evenly spaced, stacks on small screens
- [x] Product cards use padding, border, `box-shadow`, `border-radius`
- [x] Product grid uses CSS Grid, wraps responsively (4 → 2 → 1 columns)
- [x] Checkout form: consistent input sizing/padding, visible focus states, styled submit button with hover
- [x] `@media` queries for mobile-width layout (nav stacks, cards go single-column, cart table reflows)
- [x] Cart table and footer styled to match the overall theme

## Design notes

- Dark, warm-charcoal palette (`#14161b`) with a single amber accent (`#e8a33d`) and a muted sage secondary (`#6e8f73`) — chosen to fit an audio-gear brand rather than a generic template look.
- The waveform "signature" mark (animated vertical bars) in the header/footer logo and the hero EQ visual ties the visual identity back to the product category.
- Type: Space Grotesk for headings, Inter for body text.
- Respects `prefers-reduced-motion` by disabling the waveform animation.

## Lab Sheet 2 checklist (Phase 3 — Vanilla JavaScript)

- [x] `script.js` with a `PRODUCTS` array (8 products: id, name, price, image, category)
- [x] `products.html` product grid rendered dynamically from `PRODUCTS` via `innerHTML` template literals
- [x] "Add to Cart" click handler on every card — updates a `cart` array and persists it to `localStorage`
- [x] `cart.html` reads the cart from `localStorage` and renders each row with a quantity `<input>` and a "Remove" button
- [x] `calculateTotal()` recalculates the grand total on every quantity change or removal
- [x] `checkout.html` validates Name/Address (non-empty), Pincode (exactly 6 digits), Phone (exactly 10 digits) with inline `error-msg` spans — no `alert()`
- [x] Successful submit shows an on-page "Order placed! 🎉" confirmation and clears the cart from `localStorage`
- [x] Cart badge in the navbar (`.nav-cart strong`) updates from `localStorage` on every page load

### How the pieces fit together

- `PRODUCTS` is the single source of truth for catalog data; `cart` in `localStorage` only stores `{ id, qty }` pairs and looks up everything else (name/price/image) from `PRODUCTS` — so prices can never go stale in a saved cart.
- `array.map()` builds card/row markup, `array.find()` looks up a product by id, `array.filter()` removes an item from the cart, `array.reduce()` powers `calculateTotal()` and the navbar badge count.
- `updateCartBadge()` and `renderCart()` are both called from `saveCart()`, so the badge and the cart table never drift out of sync with `localStorage`.

## Next phases (not yet built)

Lab Sheets 1 and 2 cover static structure, styling, and client-side interactivity. A later phase of the mini project will add a real backend/API (currently the "Place Order" flow only clears `localStorage` and shows a confirmation message — no server call is made).
