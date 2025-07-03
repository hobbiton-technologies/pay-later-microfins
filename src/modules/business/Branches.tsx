import AnimatedHeader from "../components/AnimatedHeader";
import ProductStats from "../summary/components/ProductStats";

const Branches = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="Branches" />
        <p>Interact with your branches</p>
      </div>
      <div>
        <ProductStats />
        <div>Branches Table</div>
      </div>
    </div>
  );
};

export default Branches;
