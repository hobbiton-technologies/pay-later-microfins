import AnimatedHeader from "../components/AnimatedHeader";
import ProductStats from "../summary/components/ProductStats";
import { MicrofinStaffTable } from "./components/MicrofinOrg/StaffMembers/MicrofinStaffTable";

const StaffMembers = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="Staff Members" />
        <p className="text-slate-500 text-xs">Manage your members</p>
      </div>
      <div className=" grid grid-cols-1 gap-6">
        <div>
          {" "}
          <ProductStats />
        </div>
        <div>
          {" "}
          <MicrofinStaffTable />
        </div>
      </div>
    </div>
  );
};

export default StaffMembers;
