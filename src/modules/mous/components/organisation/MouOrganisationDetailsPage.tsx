import { MainMicrofinOrgLoansTable } from "@/modules/business/components/MicrofinOrg/Loans/MainMicrofinOrgLoansTable";
import { TabsProps, Tabs } from "antd";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import MouOrganisationOverviewPage from "./MouOrganisationOverviewPage";
import MouOrganisationLoansTable from "./MouOrganisationLoansTable";
import MouOrganisationEmployeesTable from "./MouOrganisationEmployeesTable";
import MouOrganisationDetailsTab from "./MouOrganisationDetailsTab";

export const MouOrganisationDetailsPage = () => {
  const location = useLocation();
  const organisation = location.state?.member;
  const navigate = useNavigate();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: (
        <MouOrganisationOverviewPage mouorganisationId={organisation} />
      ),
    },
    {
      key: "2",
      label: "Loans",
      children: (
        <MouOrganisationLoansTable MouOrganisationId={organisation} />
        // <MainMicrofinOrgLoansTable
        //   microfinOrganisationId={organisation.id}
        //   microfinMemberId={0}
        // />
      ),
    },
    {
      key: "3",
      label: "Employees",
      children: (
        <MouOrganisationEmployeesTable MouOrganisationId={organisation} />
        // <MainMicrofinOrgLoansTable
        //   microfinOrganisationId={organisation.id}
        //   microfinMemberId={0}
        // />
      ),
    },
    {
      key: "4",
      label: "MOU",
      children: <MouOrganisationDetailsTab />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <div className=" flex">
        <button type="button" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className=" w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="  flex w-full mb-5 h-full py-2 text-sm gap-2  md:text-lg rounded-sm font-semibold sticky top-0 z-10 shadow-md md:shadow-none text-gray-600 justify-center items-center min-h-16 "
        >
          {/*<UserOutlined />*/}
          <h1>{organisation.name}</h1>
        </motion.div>
      </div>
      <section className="w-full h-full  justify-evenly items-center">
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </section>
    </div>
  );
};
