import AnimatedHeader from "../components/AnimatedHeader";
import ProductStats from "../summary/components/ProductStats";
import { StaffTable } from "./components/StaffTable";

const StaffMembers = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="Staff Members" />
        <p>Manage your members</p>
      </div>
      <div className=" grid grid-cols-1 gap-6">
        <div>
          {" "}
          <ProductStats />
        </div>
        <div>
          {" "}
          <StaffTable showCreateButton={false} />
        </div>
      </div>
    </div>
  );
};

export default StaffMembers;
