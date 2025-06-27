import AnimatedHeader from "../components/AnimatedHeader";
import SummaryStats from "./components/summaryStats";

const Summary: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div>
        <AnimatedHeader title="Overview" />
        <p>Hilights of transaction actions and updates</p>
      </div>
      <SummaryStats />
    </div>
  );
};

export default Summary;
