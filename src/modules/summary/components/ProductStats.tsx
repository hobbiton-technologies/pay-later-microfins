const ProductStats = () => {
  const productsStats = [
    {
      title: "Total Products",
      amount: 2000,
      descriptionText: "Total number of products",
    },
    {
      title: "Loan Products",
      amount: 2000,
      descriptionText: "Total number of products",
    },
    {
      title: "Saving Products",
      amount: 2000,
      descriptionText: "Total number of products",
    },
    {
      title: "Active Loan Products",
      amount: 2000,
      descriptionText: "Total number of products",
    },
    {
      title: "Active Saving Products",
      amount: 2000,
      descriptionText: "Total number of products",
    },
  ];
  return (
    <div className=" grid grid-cols-5 gap-6 pt-4">
      {productsStats.map(({ title, amount, descriptionText }) => (
        <div
          className=" bg-white p-4 rounded-md shadow  transition-all duration-300 flex flex-col justify-between"
          key={title}
        >
          <div className=" font-semibold text-lg border-b border-slate-300 pb-2">
            {title}
          </div>
          <div>{amount}</div>
          <div>{descriptionText}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;
