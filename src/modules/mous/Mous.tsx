import AnimatedHeader from "../components/AnimatedHeader";
import { MouStats } from "./components/mou/MouStats";
import { MouTable } from "./components/mou/MouTable";

const Mous = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="MOU's" />
        <p className=" text-slate-500 text-xs">Access and manage MOUs here</p>
      </div>
      <div className=" grid grid-cols-1 gap-6">
        <MouStats />
        <MouTable />
      </div>
    </div>
  );
};

export default Mous;
