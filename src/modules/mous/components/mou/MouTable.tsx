import { Button, Dropdown, MenuProps, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import {
  MouProductsData,
  useGetMouProductsQuery,
} from "@/api/queries/mouQueries";
import { useState } from "react";
import { number } from "framer-motion";
import { customLoader } from "@/components/table-loader";

export const MouTable = () => {
  const [id, setId] = useState<number>(0);
  const [microfinId, setMicrofinId] = useState<number>(0);
  const [organizationId, setOrganizationId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setPageNumber] = useState<number | null>(1);

  const { data: apiResponse, isFetching } = useGetMouProductsQuery({
    id: id,
    microfinId: microfinId,
    organizationId: organizationId,
    startdate: startDate,
    endDate: endDate,
    pageSize: pageSize ?? 10,
    pageNumber: pageNumber ?? 1,
  });

  const MouColumns: ColumnsType<MouProductsData> = [
    {
      title: "Organisation Name",
      dataIndex: "organization",
      key: "organization",
      render: (_, record: MouProductsData) => record.organization.name,
    },
    {
      title: "Email",
    },
    {
      title: "Address",
    },
    {
      title: "Proposed By",
    },
    {
      title: "Status",
    },
    {
      title: "Start Date",
    },
    {
      title: "End Date",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                onClick={() => alert("View CLicked")}
              >
                <EyeOutlined />
                View
              </span>
            ),
          },
        ];

        return (
          <Space>
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button className=" dark:text-white">
                <div className="  text-lg font-semibold items-center">
                  <EllipsisOutlined />
                </div>
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          dataSource={apiResponse?.data || []}
          columns={MouColumns}
          rowKey="id"
          //   onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          //   pagination={{
          //     current: pageNumber ?? 1,
          //     pageSize: pageSize,
          //     total: microfinBranches?.totalItems,
          //   }}
          components={{
            header: {
              cell: (props: any) => (
                <th
                  {...props}
                  className="border-b-2 !bg-white !text-gray-400 text-xs !font-normal "
                >
                  {props.children}
                </th>
              ),
            },
            body: {
              cell: (props: any) => (
                <td {...props} className=" border-gray-300  text-xs  ">
                  {props.children}
                </td>
              ),
            },
          }}
        />
      </section>
    </div>
  );
};
