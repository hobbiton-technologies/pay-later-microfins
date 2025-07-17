import { formatCurrency } from "@/utils/formaters";
import { BarChartOutlined } from "@ant-design/icons";

const MicrofinOrganisationStats = () => {
  const productsStats = [
    {
      title: "Clients",
      icon: <BarChartOutlined />,
      values: {
        dtd: 10,
        mtd: 50,
        ytd: 23445,
      },
      descriptionText: "Total number of clients",
    },
    {
      title: "Disbursed Loans",
      icon: <BarChartOutlined />,
      values: {
        dtd: "23445",
        mtd: 120,
        ytd: 300,
      },
      descriptionText: "Disbursed Amounts",
    },
    {
      title: "Approved Loans",
      icon: <BarChartOutlined />,
      values: {
        dtd: 50,
        mtd: 100,
        ytd: 23445,
      },
      descriptionText: "Total number of saving products",
    },
    {
      title: "Disbursed Amount",
      icon: <BarChartOutlined />,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(23445),
      },
      descriptionText: "Disbursed Amounts",
    },

    {
      title: "Approved Amount",
      icon: <BarChartOutlined />,
      values: {
        dtd: formatCurrency(23445),
        mtd: formatCurrency(23345677),
        ytd: formatCurrency(23445),
      },
      descriptionText: "Total number of active loan products",
    },
  ];
  return (
    <div className=" grid grid-cols-5 gap-6 pt-4">
      {productsStats.map(({ title, values, icon: Icon }) => (
        <div
          className=" bg-white p-4 rounded-xl shadow  transition-all duration-300 flex flex-col justify-between"
          key={title}
        >
          <div className=" grid grid-cols-1 text-xs text-gray-600 space-y-1">
            <div className=" flex items-center gap-2 text-md font-semibold mb-2 justify-between">
              <span className="">{title}</span>
              {/* <Icon /> */}
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

export default MicrofinOrganisationStats;
