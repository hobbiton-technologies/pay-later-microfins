import {
  CreditCardOutlined,
  BankOutlined,
  StopOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const SummaryStats = () => {
  const statItems = [
    {
      label: "Disbursed Amt",
      icon: CreditCardOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Active Loans Amt",
      icon: BankOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Interest Amt",
      icon: StopOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Fully Settled Amt",
      icon: RiseOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Daily Amt",
      icon: CreditCardOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Monthly Amt",
      icon: BankOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Annual Amt",
      icon: StopOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Active Loans",
      icon: RiseOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
  ];
  return (
    <div className=" grid grid-cols-4 gap-6 pt-4">
      {statItems.map(({ label, icon: Icon, values }) => (
        <div
          className=" bg-white p-4 rounded-xl shadow  transition-all duration-300 flex flex-col justify-between"
          key={label}
        >
          <div className=" text-xs text-gray-600 space-y-1">
            <div className=" flex items-center gap-2 text-lg font-semibold mb-2 justify-between">
              <span>{label}</span>
              <Icon />
            </div>
            <div className=" text-3xl font-semibold">{values.ytd}</div>
            <div className=" border-t pt-2">
              <div className=" flex gap-2 ">
                <span>DTD: </span>
                <div>{values.dtd}</div>
              </div>
              <div className=" flex gap-2">
                <span>MTD: </span>
                <div>{values.mtd}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;
