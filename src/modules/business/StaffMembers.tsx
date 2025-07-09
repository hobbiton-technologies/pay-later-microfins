import AnimatedHeader from "../components/AnimatedHeader";
import ProductStats from "../summary/components/ProductStats";

const StaffMembers = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="Staff Members" />
        <p>Manage your members</p>
      </div>
      <div>
        <ProductStats />
      </div>
    </div>
  );
};

export default StaffMembers;
