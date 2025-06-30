import { BarChartOutlined } from "@ant-design/icons";

const ProductStats = () => {
  const productsStats = [
    {
      title: "Total Products",
      icon: <BarChartOutlined />,
      amount: 2000,
      descriptionText: "Total number of products",
    },
    {
      title: "Loan Products",
      icon: <BarChartOutlined />,
      amount: 2000,
      descriptionText: "Total number of products",
    },
    {
      title: "Saving Products",
      icon: <BarChartOutlined />,
      amount: 2000,
      descriptionText: "Total number of products",
    },
    {
      title: "Active Loan Products",
      icon: <BarChartOutlined />,
      amount: 2000,
      descriptionText: "Total number of products",
    },
    {
      title: "Active Saving Products",
      icon: <BarChartOutlined />,
      amount: 2000,
      descriptionText: "Total number of products",
    },
  ];
  return (
    <div className=" grid grid-cols-5 gap-6 pt-4">
      {productsStats.map(({ title, amount, icon: Icon, descriptionText }) => (
        <div
          className=" bg-white p-4 rounded-md shadow  transition-all duration-300 grid grid-cols-1 gap-4"
          key={title}
        >
          <div className=" font-semibold  border-b border-slate-300 pb-2 flex items-center justify-between">
            <div>{title}</div>
            <div className=" text-lg">{Icon}</div>
          </div>
          <div className=" text-2xl font-bold">{amount}</div>
          <div>{descriptionText}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;
