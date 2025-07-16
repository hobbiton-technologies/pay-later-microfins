import { Segmented, Tabs, TabsProps } from "antd";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { MicrofinOrgStaffTable } from "./MicrofinOrgStaffTable";
import { MicrofinOrgLoansTable } from "./MicrofinOrgLoansTable";
import React from "react";

type Align = "start" | "center" | "end";

export const MicrofinOrgDetailsPage = () => {
  const location = useLocation();
  const organisation = location.state?.member;
  const navigate = useNavigate();
  const [alignValue, setAlignValue] = React.useState<Align>("start");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Staff Members",
      children: (
        <MicrofinOrgStaffTable
          microfinOrganisationId={organisation.id}
          microfinMemberId={0}
        />
      ),
    },
    {
      key: "2",
      label: "Loans",
      children: (
        <MicrofinOrgLoansTable
          microfinOrganisationId={organisation.id}
          microfinMemberId={0}
        />
      ),
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <div className=" flex">
        <button onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className=" w-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="  flex w-full mb-5 h-full py-2 text-sm gap-2  md:text-lg rounded-sm font-semibold sticky top-0 z-10 shadow-md md:shadow-none text-gray-600 justify-center items-center min-h-16 bg-white"
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
