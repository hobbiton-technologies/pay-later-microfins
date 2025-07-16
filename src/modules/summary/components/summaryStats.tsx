import {
  CreditCardOutlined,
  BankOutlined,
  StopOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "../../../utils/formaters";
import {
  FinanceStatsData,
  OverviewStatsData,
  useGetfinanceStatsQuery,
  useGetOverviewStatsQuery,
} from "@/api/queries/summaryQueries";
import { useEffect, useState } from "react";

const SummaryStats = () => {
  const [financialOverview, setFinancialOverview] =
    useState<FinanceStatsData>();
  const [overviewData, setOverviewData] = useState<OverviewStatsData>();

  const { data: financialResponse, isFetching } = useGetfinanceStatsQuery({
    organizationId: Number(localStorage.getItem("organizationId")),
  });

  const { data: overviewResponse } = useGetOverviewStatsQuery({
    organizationId: Number(localStorage.getItem("organizationId")),
  });

  useEffect(() => {
    if (overviewResponse) {
      setOverviewData(overviewResponse?.data);
    }

    if (financialResponse) {
      setFinancialOverview(financialResponse?.data);
    }
  });
  const statItems = [
    {
      label: "Disbursed Amt",
      icon: CreditCardOutlined,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: financialResponse?.data.totalDisbursementAmount,
      },
    },
    {
      label: "Active Loans Amt",
      icon: BankOutlined,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(6543331),
      },
    },
    {
      label: "Interest Amt",
      icon: StopOutlined,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: financialResponse?.data.totalInterestAmount,
      },
    },
    {
      label: "Fully Settled Amt",
      icon: RiseOutlined,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(6543331),
      },
    },
    {
      label: "Loans Disbursed",
      icon: RiseOutlined,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(6543331),
      },
    },
    {
      label: "Daily Amt",
      icon: CreditCardOutlined,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: overviewResponse?.data.dailyAmount,
      },
    },
    {
      label: "Monthly Amt",
      icon: BankOutlined,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: overviewResponse?.data.monthlyAmount,
      },
    },
    {
      label: "Annual Amt",
      icon: StopOutlined,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: overviewResponse?.data.annualAmount,
      },
    },
    {
      label: "Active Loans",
      icon: RiseOutlined,
      values: {
        dtd: "23445",
        mtd: formatCurrency(23345677),
        ytd: overviewResponse?.data.activeLoans,
      },
    },
    {
      label: "Failed Loans",
      icon: RiseOutlined,
      values: {
        dtd: "23445",
        mtd: formatCurrency(23345677),
        ytd: overviewResponse?.data.failedLoans,
      },
    },
  ];
  return (
    <div className=" grid grid-cols-5 gap-4 pt-4">
      {" "}
      {statItems.map(({ label, icon: Icon, values }) => (
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
              <div className=" text-lg font-bold text-blue-950">{values.ytd}</div>
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
    </div>
  );
};

export default SummaryStats;
