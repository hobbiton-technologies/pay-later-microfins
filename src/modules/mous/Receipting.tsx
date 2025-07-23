import AnimatedHeader from "../components/AnimatedHeader";
import { ReceiptingStats } from "./components/receipting/ReceiptingStats";
import { ReceiptingTable } from "./components/receipting/ReceiptingTable";

const Receipting = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="Receipting" />
        <p>View and manage all receipts.</p>
      </div>
      <div className=" grid grid-cols-1 gap-6">
        <ReceiptingStats />
        <ReceiptingTable />
      </div>
    </div>
  );
};

export default Receipting;
