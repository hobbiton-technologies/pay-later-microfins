import AnimatedHeader from "../components/AnimatedHeader";
import { MouOrganisationTable } from "./components/organisation/MouOrganisationTable";

const MouOrganisations = () => {
  return (
    <div>
      <div className=" pb-4">
        <AnimatedHeader title="Organisations" />
        <p className="text-slate-500 text-xs">
          Access and manage organizations here. Below is a comprehensive list of
          all the organizations that exist within the system
        </p>
      </div>
      <MouOrganisationTable />
    </div>
  );
};

export default MouOrganisations;
