import {
  OrganisationStatsData,
  useGetOrganisationStatsQuery,
} from "@/api/queries/summaryQueries";
import { TrendingUp } from "lucide-react";
import { Cell, LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export const OrganisationPieChart = () => {
  const [organisationStatsData, setOrganisationStatsData] =
    useState<OrganisationStatsData>();

  interface ChartConfigItem {
    label: string;
    color: string;
  }

  interface ChartConfigType {
    all: ChartConfigItem;
    withMou: ChartConfigItem;
    withoutMou: ChartConfigItem;
    [key: string]: ChartConfigItem;
  }

  const chartConfig: ChartConfigType = {
    all: {
      label: "All",
      color: "#000080",
    },
    withMou: {
      label: "With MOU",
      color: "#000090",
    },
    withoutMou: {
      label: "Without MOU",
      color: "#000084",
    },
  };

  const { data: apiResponse, isFetching } = useGetOrganisationStatsQuery({
    organizationId: Number(localStorage.getItem("organizationId")),
  });

  useEffect(() => {
    if (apiResponse) {
      setOrganisationStatsData(apiResponse?.data);
    }
  }, [apiResponse]);

  return (
    <div className="  h-full w-full ">
      {" "}
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle> Organisation Statistics</CardTitle>
          <CardDescription>
            January -{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <div className="w-full h-full flex justify-center items-center min-h-96">
          {isFetching ? (
            <div className="flex flex-col gap-2">
              <Spin tip="Loading..." />
              <h1 className="text-gray-500">Loading</h1>
            </div>
          ) : (
            <div className="h-full  flex flex-col justify-center items-center">
              <CardContent className="flex-1 flex justify-center items-center">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px] h-full [&_.recharts-text]:fill-background"
                >
                  <PieChart>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent nameKey="visitors" hideLabel />
                      }
                    />
                    <Pie
                      data={[
                        {
                          key: "all",
                          visitors: organisationStatsData?.all ?? 0,
                        },
                        {
                          key: "withMou",
                          visitors: organisationStatsData?.withMou ?? 0,
                        },
                        {
                          key: "withoutMou",
                          visitors: organisationStatsData?.withoutMou ?? 0,
                        },
                      ]}
                      dataKey="visitors"
                      nameKey="key"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                    >
                      {[
                        {
                          key: "all",
                          visitors: organisationStatsData?.all ?? 0,
                        },
                        {
                          key: "withMou",
                          visitors: organisationStatsData?.withMou ?? 0,
                        },
                        {
                          key: "withoutMou",
                          visitors: organisationStatsData?.withoutMou ?? 0,
                        },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            chartConfig[entry.key as keyof typeof chartConfig]
                              .color
                          }
                        />
                      ))}
                      <LabelList
                        dataKey="key"
                        position="outside"
                        formatter={(value) =>
                          typeof value === "string" && chartConfig[value]
                            ? chartConfig[value].label
                            : value
                        }
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
