import { BarChartOutlined } from "@ant-design/icons";

export const MouStats = () => {
  const mouStats = [
    {
      title: "Total",
      icon: <BarChartOutlined />,
      amount: 102,
      descriptionText: "Total proposals",
    },
    {
      title: "Accepted",
      icon: <BarChartOutlined />,
      amount: 100,
      descriptionText: "Total accepted proposals",
    },
    {
      title: "Pending",
      icon: <BarChartOutlined />,
      amount: 2,
      descriptionText: "Total pending proposals",
    },
    {
      title: "Rejected",
      icon: <BarChartOutlined />,
      amount: 0,
      descriptionText: "Total rejected proposals",
    },
  ];
  return (
    <div className=" grid grid-cols-4 gap-6 pt-4">
      {mouStats.map(({ title, amount, icon: Icon, descriptionText }) => (
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
      ))}
    </div>
  );
};
