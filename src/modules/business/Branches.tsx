import AnimatedHeader from "../components/AnimatedHeader";
import ProductStats from "../summary/components/ProductStats";
import { BranchesTable } from "./components/Branches/BranchesTable";

const Branches = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="Branches" />
        <p>Interact with your branches</p>
      </div>
      <div>
        <ProductStats />
        <div>
          <BranchesTable />
        </div>
      </div>
    </div>
  );
};

export default Branches;
