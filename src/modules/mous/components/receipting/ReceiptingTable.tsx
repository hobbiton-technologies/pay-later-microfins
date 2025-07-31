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
  DatePicker,
} from "antd";
import {
  MouReceiptingData,
  useGetMouReceiptingQuery,
} from "@/api/queries/mouQueries";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formaters";
import { createHandleTableChange } from "@/utils/HandleTableChange";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import Papa from "papaparse";
import saveAs from "file-saver";
import { AllocationsTable } from "./AllocationsTable";
import { AllocationForm } from "./AllocationForm";

export const ReceiptingTable = () => {
  const [id, setSearchId] = useState<string>("");
  const [receipts, setReceipts] = useState<MouReceiptingData[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<
    MouReceiptingData | undefined
  >(undefined);
  const [isRecieptsDrawerVisible, setIsRecieptsDrawerVisible] =
    useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const [status, setStatus] = useState<string[] | null>(null);
  const [filteredStatus, setFilteredStatus] = useState<string[] | null>(null);

  const { RangePicker } = DatePicker;

  const { data: apiResponse, isFetching } = useGetMouReceiptingQuery({
    organisationId: Number(localStorage.getItem("organizationId")),
    status: status ?? [],
    pageSize: pageSize ?? 10,
    PageNumber: pageNumber ?? 1,
  });

  const handleViewReceipting = (receiptId: number) => {
    const receipt = (apiResponse?.data as MouReceiptingData[])?.find(
      (a) => a.id === receiptId
    );

    if (receipt) {
      setSelectedReceipt(receipt);
      setIsRecieptsDrawerVisible(true);
    }
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
      filters: [
        { text: "Open", value: "Open" },
        { text: "Exhausted", value: "Exhausted" },
        { text: "Rejected", value: "Rejected" },
        { text: "Pending", value: "Pending" },
      ],
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

  const handleTableChange = createHandleTableChange<MouReceiptingData>({
    setPageNumber,
    setPageSize,
    setStatus,
    setFilteredStatus,
  });

  const handleSearch = (values: string) => {
    setSearchId(id);
    setSearchQuery(values.trim());
  };

  const handleSearchClear = () => {
    setSearchId(id);
  };

  const exportCSV = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const modifiedCsv = receipts.map((item) => ({
      Id: item.id,
    }));

    const csvMod = Papa.unparse(modifiedCsv);
    const blob = new Blob([csvMod], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `Receipting_Report_${currentDate}`);
  };

  return (
    <div>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <div className="w-full flex gap-2">
          <DebouncedInputField
            placeholder="Search for Receipting"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
          <RangePicker
            className="min-w-52"
            onChange={(dates) => {
              setDateRange(dates as [moment.Moment, moment.Moment]);
            }}
          />
          <Button
            type="primary"
            onClick={exportCSV}
            className=" text-slate-500"
          >
            <ExportOutlined className=" text-slate-500" />
            Export
          </Button>
        </div>

        <Table
          dataSource={apiResponse?.data}
          columns={ReceiptingColumns}
          rowKey="id"
          onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          pagination={{
            current: pageNumber ?? 1,
            pageSize: pageSize ?? 10,
            total: apiResponse?.totalItems,
          }}
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
        width="50%"
        open={isRecieptsDrawerVisible}
        onClose={() => setIsRecieptsDrawerVisible(false)}
      >
        <Card>
          <div>
            <p className=" pb-4 font-semibold">Receipt Details</p>
            <Descriptions column={2} bordered={true}>
              <Descriptions.Item label="Initial Amount">
                {formatCurrency(Number(selectedReceipt?.initialAmount))}
              </Descriptions.Item>
              <Descriptions.Item label="Balance">
                {formatCurrency(Number(selectedReceipt?.balance))}
              </Descriptions.Item>
              <Descriptions.Item label="Receipt ID">
                {selectedReceipt?.receiptId}
              </Descriptions.Item>
              <Descriptions.Item label="Created Date">
                {selectedReceipt?.createdAt
                  ? new Date(selectedReceipt?.createdAt).toLocaleDateString()
                  : "Not Set"}
              </Descriptions.Item>
            </Descriptions>

            <p className=" py-4 font-semibold">Organisation Details</p>
            <Descriptions column={2} bordered={true}>
              <Descriptions.Item label="Name">
                {selectedReceipt?.organization.name ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedReceipt?.organization.email ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Physical Address">
                {selectedReceipt?.organization.address ?? "Not set"}
              </Descriptions.Item>
            </Descriptions>

            <p className=" py-4 font-semibold">Creator Details</p>
            <Descriptions column={2} bordered={true}>
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

            <div className=" pt-4">
              <p className=" font-semibold pb-4">Allocations</p>
              <AllocationsTable receiptId={selectedReceipt?.id!} />{" "}
            </div>
            <div>
              <AllocationForm />
            </div>
          </div>
        </Card>
      </Drawer>
    </div>
  );
};
