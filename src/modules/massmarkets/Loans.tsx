import AnimatedHeader from "../components/AnimatedHeader";
import { MassMarketLoansTable } from "./components/MassMarketLoansTable";

export const Loans = () => {
  return (
    <div>
      <div>
        <AnimatedHeader title="Mass Market Loans" />
        <p className="text-slate-500 text-xs">Manage your loans</p>
      </div>
      <MassMarketLoansTable />
    </div>
  );
};
