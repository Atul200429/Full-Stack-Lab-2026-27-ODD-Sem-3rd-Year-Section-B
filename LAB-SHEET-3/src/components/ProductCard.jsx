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
