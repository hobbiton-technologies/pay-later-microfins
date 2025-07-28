import Table, { ColumnsType } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  MenuProps,
  Space,
  Dropdown,
  Button,
  Tag,
  Drawer,
  Card,
  Descriptions,
} from "antd";
import {
  MouReceiptingData,
  useGetMouReceiptingQuery,
} from "@/api/queries/mouQueries";
import { useState } from "react";
import { formatCurrency } from "@/utils/formaters";

export const ReceiptingTable = () => {
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setNumber] = useState<number | null>(1);
  const [receipts, setReciepts] = useState<MouReceiptingData[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<MouReceiptingData>();
  const [isRecieptsDrawerVisible, setIsRecieptsDrawerVisible] =
    useState<boolean>(false);

  const { data: apiResponse, isFetching } = useGetMouReceiptingQuery({
    organisationId: Number(localStorage.getItem("organizationId")),
    pageSize: pageSize ?? 10,
    PageNumber: pageNumber ?? 1,
  });

  const handleViewReceipting = (receiptId: number) => {
    if (receiptId && apiResponse?.data) {
      const receipt = receipts.find((a) => a.id == receiptId);
      setSelectedReceipt(receipt);
    }

    if (receipts) {
      setIsRecieptsDrawerVisible(true);
    }
    console.log("Selected Receipt", selectedReceipt);
  };

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
      render: (record: MouReceiptingData) => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                onClick={() => handleViewReceipting(record.id)}
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
      <Drawer
        title=""
        width="45%"
        open={isRecieptsDrawerVisible}
        onClose={() => setIsRecieptsDrawerVisible(false)}
      >
        <Card>
          <div>
            <p className=" pb-4">Loan Details</p>
            <Descriptions column={2} bordered={true}>
              <Descriptions.Item label="Initial Amount">
                {formatCurrency(Number(selectedReceipt?.initialAmount))}
              </Descriptions.Item>
              <Descriptions.Item label="Balance">
                {selectedReceipt?.balance}
              </Descriptions.Item>
              <Descriptions.Item label="Receipt ID">
                {selectedReceipt?.receiptId}
              </Descriptions.Item>
              <Descriptions.Item label="Created Date">
                {selectedReceipt?.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {selectedReceipt?.organization.name ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedReceipt?.organization.email ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Physical Address">
                {selectedReceipt?.organization.address ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {selectedReceipt?.addedBy.user.firstName ?? "Not set"}{" "}
                {selectedReceipt?.addedBy.user.lastName ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Employee ID">
                {selectedReceipt?.addedBy.employeeIdNumber ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Position">
                {selectedReceipt?.addedBy.position ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {selectedReceipt?.addedBy.user.phoneNumber ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="ID Type">
                {selectedReceipt?.addedBy.idType ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="ID Number">
                {selectedReceipt?.addedBy.idNumber ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedReceipt?.addedBy.user.email ?? "Not set"}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      </Drawer>
    </div>
  );
};
