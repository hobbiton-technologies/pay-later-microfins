import AnimatedHeader from "../components/AnimatedHeader";
import { MassMarketLoansTable } from "../massmarkets/components/MassMarketLoansTable";
import { DisbursedLoansChart } from "./components/DisbursedLoansChart";
import { LoanPerformaceChart } from "./components/LoanPerformanceChart";
import { MassMarketClientChart } from "./components/MassMarketClientChart";
import { OrganisationPieChart } from "./components/OrganisationPieChart";
import { RepaymentLoansChart } from "./components/RepaymentLoansChart";
import SummaryStats from "./components/summaryStats";

const Summary: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div>
        <AnimatedHeader title="Overview" />
        <p className="text-slate-500 text-xs mb-2">
          Hilights of transaction actions and updates
        </p>
      </div>
      <div className=" grid grid-cols-1 gap-6">
        <div>
          <SummaryStats />
        </div>
        <div className="w-full h-full grid grid-cols-1 gap-4">
          <div className=" grid grid-cols-3 gap-4">
            <div className=" col-span-2">
              <LoanPerformaceChart />
            </div>
            <div className=" col-span-1 w-full">
              <div className=" flex-1">
                <OrganisationPieChart />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-4">
            <div className=" col-span-1 w-full">
              <div className=" flex-1">
                <MassMarketClientChart />
              </div>
            </div>
            <div className=" col-span-1 w-full">
              <div className=" flex-1">
                <DisbursedLoansChart />
              </div>
            </div>
            <div className=" col-span-1 w-full">
              <div className=" flex-1">
                <RepaymentLoansChart />
              </div>
            </div>
          </div>
          <div>
            <div className=" col-span-1 w-full">
              <div className=" flex-1">
                <MassMarketLoansTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
