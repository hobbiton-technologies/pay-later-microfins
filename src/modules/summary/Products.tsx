import AnimatedHeader from "../components/AnimatedHeader";
import ProductStats from "./components/ProductStats";

export const Products = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="Products" />
        <p>Customizable financial products</p>
      </div>
      <div>
        <ProductStats />
      </div>
    </div>
  );
};
