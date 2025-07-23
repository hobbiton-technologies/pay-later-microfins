import { BarChartOutlined } from "@ant-design/icons";

export const MouOrganisationsStats = () => {
  const mouOverviewStats = [
    {
      title: "Borrowers",
      icon: <BarChartOutlined />,
      amount: 102,
      descriptionText: "Total proposals",
    },
    {
      title: "Principal Released",
      icon: <BarChartOutlined />,
      amount: 100,
      descriptionText: "Total accepted proposals",
    },
    {
      title: "Collections incl. Deductable Fees",
      icon: <BarChartOutlined />,
      amount: 2,
      descriptionText: "Total pending proposals",
    },
    {
      title: "New Borrowers with First Loan",
      icon: <BarChartOutlined />,
      amount: 0,
      descriptionText: "Total rejected proposals",
    },
  ];
  return (
    <div className=" grid grid-cols-4 gap-6 pt-4">
      {mouOverviewStats.map(
        ({ title, amount, icon: Icon, descriptionText }) => (
          <div
            className=" bg-white p-4 rounded-md shadow  transition-all duration-300 grid grid-cols-1 gap-4"
            key={title}
          >
            <div className=" font-semibold  border-b border-slate-300 pb-2 flex items-center justify-between">
              <div className="text-xs text-slate-500">{title}</div>
              <div className=" text-lg">{Icon}</div>
            </div>
            <div className=" text-xl font-bold text-blue-950">{amount}</div>
            <div className=" text-xs text-slate-500">{descriptionText}</div>
          </div>
        )
      )}
    </div>
  );
};
