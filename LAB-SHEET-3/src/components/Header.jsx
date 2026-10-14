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
