import AnimatedHeader from "../components/AnimatedHeader";
import { LoanPerformaceChart } from "./components/LoanPerformanceChart";
import { OrganisationPieChart } from "./components/OrganisationPieChart";
import SummaryStats from "./components/summaryStats";

const Summary: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div>
        <AnimatedHeader title="Overview" />
        <p>Hilights of transaction actions and updates</p>
      </div>
      <div className=" grid grid-cols-1 gap-6">
        <div>
          <SummaryStats />
        </div>
        <div className=" flex justify-between">
          <div className=" w-[40rem]">
            <LoanPerformaceChart />
          </div>
          <div>
            <OrganisationPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
