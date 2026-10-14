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
