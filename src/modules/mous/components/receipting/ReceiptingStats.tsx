import { BarChartOutlined } from "@ant-design/icons";

export const ReceiptingStats = () => {
  const receiptStats = [
    {
      title: "All Receipts",
      icon: <BarChartOutlined />,
      amount: 4,
      descriptionText: "Total issued receipts",
    },
    {
      title: "Active Receipts",
      icon: <BarChartOutlined />,
      amount: 1,
      descriptionText: "Total active receipts",
    },
    {
      title: "Exhausted Receipts",
      icon: <BarChartOutlined />,
      amount: 3,
      descriptionText: "Total exhausted receipts",
    },
    {
      title: "Captured Receipts",
      icon: <BarChartOutlined />,
      amount: 4,
      descriptionText: "Total captured receipts",
    },
  ];
  return (
    <div className=" grid grid-cols-4 gap-6 pt-4">
      {receiptStats.map(({ title, amount, icon: Icon, descriptionText }) => (
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
