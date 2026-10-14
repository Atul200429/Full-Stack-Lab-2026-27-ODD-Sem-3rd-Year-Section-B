# Wavelength React — Lab Sheet 3

Mini e-commerce storefront rebuilt with **Vite + React** for  
**BTCS303P Full Stack Development — Lab Sheet 3 (Components, Props, useState)**.

Store concept: Wavelength, a small audio-gear shop (headphones, earbuds, speakers).

## Quick start

```bash
cd wavelength-react   # rename this folder if needed
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  data/
    products.js          # Mock catalog (8 products) — temporary data source
  components/
    ProductCard.jsx      # Single product + Add to Cart (props)
    ProductList.jsx      # Maps products → ProductCard (key = product.id)
    Cart.jsx             # Cart table, qty inputs, remove, totals
    CheckoutForm.jsx     # Controlled form + validation + confirmation
    Header.jsx           # Navbar + cart badge toggle
    Footer.jsx
    Hero.jsx
  App.jsx                # Cart state (useState), view routing, lifts state up
  main.jsx
  index.css              # Full Wavelength theme (from Lab 1/2)
```

## Lab Sheet 3 checklist

| Task | Status |
|------|--------|
| Vite + React project created | ✅ |
| Product data in `products.js` (exported array) | ✅ |
| `ProductCard` receives product as props, shows image/name/price/Add to Cart | ✅ |
| `ProductList` maps products and renders `ProductCard` with **unique key = product.id** | ✅ |
| Cart state in `App` with `useState` — array of `{ product, quantity }` | ✅ |
| `addToCart` passed down to `ProductCard` via props | ✅ |
| `Cart` receives cart + remove/update, shows qty & subtotal + grand total | ✅ |
| Show/hide cart via navbar cart icon + item count badge | ✅ |
| `CheckoutForm` with controlled inputs for Name, Address, Pincode, Phone, Payment | ✅ |
| Conditional rendering: empty cart message when cart is empty | ✅ |

## Concepts demonstrated

- Functional components + props (parent → child data flow)
- useState for cart, form fields, and view/UI toggles
- Lists & keys — map() with product.id, never array index
- Conditional rendering — empty cart message vs. table
- Lifting state up — cart lives in App, not in ProductCard

## How to use the app

1. **Home** — hero + 4 featured products (Add works).
2. **Products** — full grid of 8 cards; click **Add to Cart**.
3. Navbar **Cart N** badge updates live; click it (or Cart link) to open the cart view.
4. In **Cart** — change quantities, remove items, see totals; **Proceed to checkout**.
5. **Checkout** — fill Name / Address / Pincode (6 digits) / Phone (10 digits); Place Order.
   - Invalid fields show inline errors (no alert()).
   - Success shows confirmation and clears the cart.

## Notes

- No backend — “Place Order” only clears cart and shows confirmation.
- Styling reuses the Lab 1/2 dark charcoal + amber theme.
- You may rename the folder to `wavelength-react` for submission.
