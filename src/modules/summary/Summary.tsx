import AnimatedHeader from "../components/AnimatedHeader";
import { LoanPerformaceChart } from "./components/LoanPerformanceChart";
import { OrganisationPieChart } from "./components/OrganisationPieChart";
import SummaryStats from "./components/summaryStats";

const Summary: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div>
        <AnimatedHeader title="Overview" />
        <p className="text-slate-500 text-xs mb-2">Hilights of transaction actions and updates</p>
      </div>
      <div className=" grid grid-cols-1 gap-6">
        <div>
          <SummaryStats />
        </div>
        <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
          <div className=" ">
            <LoanPerformaceChart />
          </div>
          <div className=" w-full flex-1">
            <OrganisationPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
