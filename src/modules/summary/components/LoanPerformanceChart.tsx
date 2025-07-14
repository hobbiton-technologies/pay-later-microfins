import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig } from "@/components/ui/chart";
import { LoanStats, useGetLoanStatsQuery } from "@/api/queries/summaryQueries";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Spin } from "antd";

export const LoanPerformaceChart = () => {
  const [loanSummaryStats, setLoanSummaryStats] = useState<LoanStats[]>([]);
  const { data: apiResponse, isFetching } = useGetLoanStatsQuery({
    organizationId: Number(localStorage.getItem("organizationId")),
  });

  const chartConfig = {
    loansTotal: {
      label: "Total Loans",
      color: "#000080",
    },
    repaymentsTotal: {
      label: "Total Repayments",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    if (apiResponse) {
      setLoanSummaryStats(apiResponse?.data || []);
    }
  }, [apiResponse]);

  const transformedData = loanSummaryStats.map((item) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[item.month - 1] || `Month ${item.month}`;

    return {
      month: monthName,
      loansTotal: item.monthlyStats?.loansTotal || 0,
      repaymentsTotal: item.monthlyStats?.repaymentsTotal || 0,
    };
  });

  const calculateTrend = () => {
    if (transformedData.length < 2) return 0;

    const lastMonth = transformedData[transformedData.length - 1];
    const previousMonth = transformedData[transformedData.length - 2];

    const lastTotal = lastMonth.loansTotal + lastMonth.repaymentsTotal;
    const previousTotal =
      previousMonth.loansTotal + previousMonth.repaymentsTotal;

    if (previousTotal === 0) return 0;

    return (((lastTotal - previousTotal) / previousTotal) * 100).toFixed(1);
  };

  const trendPercentage = calculateTrend();

  return (
    <div className="">
      <Card className="h-full flex flex-col">
        <CardHeader className=" items-center">
          <CardTitle>Loan Performance by Month</CardTitle>
          <CardDescription>
            Monthly loans vs repayments comparison
          </CardDescription>
        </CardHeader>

        <div className="w-full h-full flex justify-center items-center p-2">
          {isFetching ? (
            <div className="flex flex-col gap-2 items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <h1 className="text-gray-500">
                <Spin>Loading...</Spin>
              </h1>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center w-full">
              <CardContent className="flex-1 w-full border-none p-0">
                {transformedData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={transformedData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.1)" }}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 shadow-lg">
                                <p className="font-medium text-gray-800">
                                  {label}
                                </p>
                                {payload.map((entry, index) => {
                                  const dataKey =
                                    entry.dataKey as keyof typeof chartConfig;
                                  const config = chartConfig[dataKey];

                                  return (
                                    <p
                                      key={index}
                                      className="text-sm"
                                      style={{ color: entry.color }}
                                    >
                                      {config?.label || entry.dataKey}: $
                                      {entry.value?.toLocaleString()}
                                    </p>
                                  );
                                })}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        dataKey="loansTotal"
                        fill={chartConfig.loansTotal.color}
                        radius={[4, 4, 0, 0]}
                        name={chartConfig.loansTotal.label}
                      />
                      <Bar
                        dataKey="repaymentsTotal"
                        fill={chartConfig.repaymentsTotal.color}
                        radius={[4, 4, 0, 0]}
                        name={chartConfig.repaymentsTotal.label}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[350px] text-gray-500">
                    <p>No loan data available</p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  {Number(trendPercentage) > 0 ? (
                    <>
                      Trending up by {trendPercentage}% this month
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </>
                  ) : Number(trendPercentage) < 0 ? (
                    <>
                      Trending down by {Math.abs(Number(trendPercentage))}% this
                      month
                      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                    </>
                  ) : (
                    <>
                      No change from last month
                      <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                    </>
                  )}
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing loan performance for the last {transformedData.length}{" "}
                  months
                </div>
              </CardFooter>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
