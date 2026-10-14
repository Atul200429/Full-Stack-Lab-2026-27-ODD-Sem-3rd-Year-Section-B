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
