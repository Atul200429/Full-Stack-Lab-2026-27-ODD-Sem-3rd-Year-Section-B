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

## Next phases (not yet built)

This lab sheet only covers static structure and styling. Later phases of the mini project (per the course) will add JS interactivity (cart state, form validation) and a backend/API — those are separate lab sheets.
