import AnimatedHeader from "../components/AnimatedHeader";
import SummaryStats from "./components/summaryStats";

const Summary: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AnimatedHeader title="Dashboard / Summary" />
      <SummaryStats />
    </div>
  );
};

export default Summary;
