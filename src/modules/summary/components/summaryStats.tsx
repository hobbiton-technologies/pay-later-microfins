import {
  CreditCardOutlined,
  BankOutlined,
  StopOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const SummaryStats = () => {
  const statItems = [
    {
      label: "First Stat",
      icon: CreditCardOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Second Stat",
      icon: BankOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Third Stat",
      icon: StopOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
    {
      label: "Fourth Stat",
      icon: RiseOutlined,
      values: {
        dtd: "23445",
        mtd: "23345677",
        ytd: "654333156788",
      },
    },
  ];
  return (
    <div className=" grid grid-cols-4 gap-6">
      {statItems.map(({ label, icon: Icon, values }) => (
        <div
          className=" bg-white p-4 rounded-xl shadow  transition-all duration-300 flex flex-col justify-between"
          key={label}
        >
          <div className=" text-xs text-gray-600 space-y-1">
            <div className=" flex items-center gap-2 text-lg font-semibold mb-2">
              <Icon />
              <span>{label}</span>
            </div>
            <div className=" flex gap-2 ">
              <span>DTD: </span>
              <div>{values.dtd}</div>
            </div>
            <div className=" flex gap-2">
              <span>MTD: </span>
              <div>{values.mtd}</div>
            </div>
            <div className=" flex gap-2">
              <span>YTD: </span>
              <div>{values.ytd}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;
