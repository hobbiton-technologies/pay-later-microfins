import { formatCurrency } from "@/utils/formaters";
import {
  BankOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

export const MouOrganisationsStats = () => {
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
    </div>
  );
};
