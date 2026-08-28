import productList from "../data/ProductLinks";
import Carousel from "./Carousel";

function Products() {
  return (
      <div id="product" className="product-container">

        <Carousel products={productList} />
      </div>
  );
}

export default Products;