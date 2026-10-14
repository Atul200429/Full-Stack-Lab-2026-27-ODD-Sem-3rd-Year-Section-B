/**
 * ProductList — imports products, maps over them, renders ProductCard
 * with a unique key (product.id, never array index).
 */
import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList({ onAddToCart }) {
  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>All products</h2>
            <p>Eight pieces of gear, four categories, zero filler.</p>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
