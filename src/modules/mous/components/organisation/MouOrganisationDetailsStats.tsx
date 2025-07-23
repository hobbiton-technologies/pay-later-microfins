import { formatCurrency } from "@/utils/formaters";
import {
  BankOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { useState } from "react";

export const MouOrganisationsStats = () => {
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleCards = () => {
    setIsExpanded(!isExpanded);
  };

  const mouOverviewStats = [
    {
      label: "Borrowers",
      icon: BarChartOutlined,
      amount: 102,
      values: {
        dtd: 7,
        mtd: 77,
        ytd: 2000,
      },
    },
    {
      label: "Principal Released",
      icon: BankOutlined,
      amount: 100,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(2000),
      },
    },
    {
      label: "Collections incl. Deductable Fees",
      icon: CreditCardOutlined,
      amount: 2,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(2000),
      },
    },
    {
      label: "New Borrowers with First Loan",
      icon: UserAddOutlined,
      amount: 0,
      values: {
        dtd: 5,
        mtd: 77,
        ytd: 40,
      },
    },
  ];

  const moreOverviewStats = [
    {
      label: "Principal Outstanding",
      icon: BarChartOutlined,
      amount: 102,
      values: {
        dtd: 300,
        mtd: 129,
        ytd: 46,
      },
    },
    {
      label: "Default Loans",
      icon: BankOutlined,
      amount: 100,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(2000),
      },
    },
    {
      label: "Penalty Outstanding",
      icon: CreditCardOutlined,
      amount: 2,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(2000),
      },
    },
    {
      label: "Fees Outstanding",
      icon: UserAddOutlined,
      amount: 0,
      values: {
        dtd: 5,
        mtd: 77,
        ytd: 40,
      },
    },

    {
      label: "Employees",
      icon: BarChartOutlined,
      amount: 102,
      values: {
        dtd: 7,
        mtd: 77,
        ytd: 2000,
      },
    },
    {
      label: "Total Disbursed Loans",
      icon: BankOutlined,
      amount: 100,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(2000),
      },
    },
    {
      label: "Repaid Loans",
      icon: CreditCardOutlined,
      amount: 2,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(2000),
      },
    },
    {
      label: "Unpaid Loans",
      icon: UserAddOutlined,
      amount: 0,
      values: {
        dtd: 5,
        mtd: 77,
        ytd: 40,
      },
    },
  ];
  return (
    <div className=" grid grid-cols-4 gap-4 pt-4">
      {" "}
      {mouOverviewStats.map(({ label, icon: Icon, values }) => (
        <div
          className=" bg-white p-4 rounded-xl shadow  transition-all duration-300 flex flex-col justify-between"
          key={label}
        >
          <div className=" grid grid-cols-1 text-xs text-gray-600 space-y-1">
            <div className=" flex items-center gap-2 text-md font-semibold mb-2 justify-between">
              <span className="">{label}</span>
              <Icon />
            </div>
            <div className=" flex justify-between mb-4">
              <div className=" text-lg font-bold text-blue-950">
                {values.ytd}
              </div>
              <div></div>
            </div>
            <div className=" border-t border-slate-300 pt-2">
              <div className=" flex gap-2 justify-between ">
                <span>Today </span>
                <div className="text-blue-950 font-semibold">{values.dtd}</div>
              </div>
              <div className=" flex gap-2 justify-between">
                <span>This Month </span>
                <div className="text-blue-950 font-semibold">{values.mtd}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {moreOverviewStats.map(({ label, icon: Icon, values }) => (
        <div
          className={` bg-white p-4 rounded-xl shadow  transition-all duration-300 flex flex-col justify-between ease-in-out ${
            isExpanded ? " h-full opacity-100" : "mah0 opacity-0"
          } overflow-hidden`}
          key={label}
        >
          {isExpanded && (
            <div className=" grid grid-cols-1 text-xs text-gray-600 space-y-1">
              <div className=" flex items-center gap-2 text-md font-semibold mb-2 justify-between">
                <span className="">{label}</span>
                <Icon />
              </div>
              <div className=" flex justify-between mb-4">
                <div className=" text-lg font-bold text-blue-950">
                  {values.ytd}
                </div>
                <div></div>
              </div>
              <div className=" border-t border-slate-300 pt-2">
                <div className=" flex gap-2 justify-between ">
                  <span>Today </span>
                  <div className="text-blue-950 font-semibold">
                    {values.dtd}
                  </div>
                </div>
                <div className=" flex gap-2 justify-between">
                  <span>This Month </span>
                  <div className="text-blue-950 font-semibold">
                    {values.mtd}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex ">
        <div style={{ width: "auto" }}>
          <button
            onClick={toggleCards}
            className="flex bg-blue-950 text-white text-sm px-4 rounded-lg py-2 items-center gap-2"
          >
            {isExpanded ? (
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                See Less Stats
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                See More Stats
              </span>
            )}
          </button>
        </div>
      </div>
      {/* <Skeleton loading={loading} active paragraph={{ rows: 1 }}></Skeleton> */}
    </div>
  );
};
