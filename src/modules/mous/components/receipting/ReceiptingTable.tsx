import Table, { ColumnsType } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MenuProps, Space, Dropdown, Button, Tag } from "antd";
import {
  MouReceiptingData,
  useGetMouReceiptingQuery,
} from "@/api/queries/mouQueries";
import { useState } from "react";
import { formatCurrency } from "@/utils/formaters";

export const ReceiptingTable = () => {
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setNumber] = useState<number | null>(1);

  const { data: apiResponse, isFetching } = useGetMouReceiptingQuery({
    organisationId: Number(localStorage.getItem("organizationId")),
    pageSize: pageSize ?? 10,
    PageNumber: pageNumber ?? 1,
  });

  const ReceiptingColumns: ColumnsType<MouReceiptingData> = [
    {
      title: "Receipt ID",
      dataIndex: "receiptId",
      key: "receiptId",
    },
    {
      title: "Organization Name",
      dataIndex: "organization",
      key: "organization",
      render: (_, record: MouReceiptingData) => record.organization.name,
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      render: (_, record: MouReceiptingData) =>
        `${record.addedBy.user.firstName} ${record.addedBy.user.lastName}`,
    },
    {
      title: "Initial Amount (ZMW)",
      dataIndex: "initialAmount",
      key: "initialAmount",
      render: (_, record: MouReceiptingData) =>
        formatCurrency(record.initialAmount),
    },
    {
      title: "Balance (ZMW)",
      dataIndex: "balance",
      key: "balance",
      render: (_, record: MouReceiptingData) => formatCurrency(record.balance),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          Open: "blue",
          Pending: "orange",
          Failed: "red",
          Exhausted: "green",
        };

        const displayName: Record<string, string> = {
          Open: "Open",
          Pending: "Pending",
          Failed: "Failed",
          Exhausted: "Exhausted",
        };

        const color = statusColors[status] || "default";
        const label = displayName[status] || status;

        return (
          <Tag color={color} style={{ fontWeight: 500 }}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
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
                <div className="  text-lg font-semibold items-center pb-2">
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
          dataSource={apiResponse?.data}
          columns={ReceiptingColumns}
          rowKey="id"
          //   onChange={handleTableChange}
          //   loading={{
          //     spinning: isFetching,
          //     indicator: customLoader,
          //   }}
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
