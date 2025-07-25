import { useGetMouStatsQuery } from "@/api/queries/mouQueries";
import { BarChartOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

export const MouStats = () => {
  const { data: apiResponse, isFetching } = useGetMouStatsQuery({
    id: Number(localStorage.getItem("organizationId")),
  });

  const stats = apiResponse?.data;

  const mouStats = [
    {
      title: "Total",
      icon: <BarChartOutlined />,
      amount: stats?.all ?? 0,
      descriptionText: "Total proposals",
    },
    {
      title: "Accepted",
      icon: <BarChartOutlined />,
      amount: stats?.accepted ?? 0,
      descriptionText: "Total accepted proposals",
    },
    {
      title: "Pending",
      icon: <BarChartOutlined />,
      amount: stats?.pending ?? 0,
      descriptionText: "Total pending proposals",
    },
    {
      title: "Rejected",
      icon: <BarChartOutlined />,
      amount: stats?.rejected ?? 0,
      descriptionText: "Total rejected proposals",
    },
  ];

  return (
    <div className=" grid grid-cols-4 gap-6 pt-4">
      <Skeleton loading={isFetching}>
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
      </Skeleton>
    </div>
  );
};
