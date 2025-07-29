import {
  MassMarketLoantData,
  useGetMassMarketClientsQuery,
  useGetMassMarketLoansQuery,
} from "@/api/queries/massMarketQueries";
import AnimatedHeader from "@/modules/components/AnimatedHeader";
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { formatCurrency } from "@/utils/formaters";
import { TimerIcon } from "lucide-react";
import dayjs from "dayjs";
import { createHandleTableChange } from "@/utils/HandleTableChange";

export const MassMarketLoansTable = () => {
  const [id, setId] = useState<number>(1);
  const [clientId, setClientId] = useState<number>(1);
  const [status, setStatus] = useState<string[]>([]);
  const [loanStatus, setloanStatus] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [massMarketLoan, setMassMarketClient] = useState<MassMarketLoantData[]>(
    []
  );

  const [selectedMassMarketLoan, setSelectedMassMarketLoan] =
    useState<MassMarketLoantData | null>(null);

  const [isLoanDrawerVisible, setIsLoanDrawerVisible] = useState(false);

  const { data: apiResponse, isFetching } = useGetMassMarketLoansQuery({
    organisationId: Number(localStorage.getItem("organizationId")),
    id: id,
    clientId: clientId,
    status: status,
    loanStatus: loanStatus,
    Query: searchQuery,
    startDate: startDate,
    endDate: endDate,
    pageNumber: pageNumber ?? 1,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (apiResponse) {
      setMassMarketClient(apiResponse?.data || []);
    }
  }, [apiResponse]);

  const handleTableChange = createHandleTableChange<MassMarketLoantData>({
    setPageNumber,
    setPageSize,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
  };

  const handleSearchClear = () => {
    setSearchQuery(searchInput);
  };

  const loanColumns: ColumnsType<MassMarketLoantData> = [
    {
      title: "Fullname",
      dataIndex: "name",
      key: "name",
      render: (_, record: MassMarketLoantData) =>
        `${record.borrowerFirstName} ${record.borrowerLastName}`,
    },
    {
      title: "Microfin Name",
      dataIndex: "name",
      key: "name",
      render: (_, record: MassMarketLoantData) => `${record.microfin.name} `,
    },
    {
      title: "ID Number",
      dataIndex: "borrowerIdNumber",
      key: "borrowerIdNumber",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record: MassMarketLoantData) => formatCurrency(record.amount),
    },
    {
      title: "Rate",
      dataIndex: "interestRate",
      key: "interestRate",
      render: (_, record: MassMarketLoantData) => `${record.interestRate}%`,
    },
    {
      title: "Repayment Amount",
      dataIndex: "repaymentAmount",
      key: "repaymentAmount",
      render: (_, record: MassMarketLoantData) =>
        `${formatCurrency(record.repaymentAmount)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          Pending: "orange",
          Failed: "red",
          Successful: "green",
        };

        const displayName: Record<string, string> = {
          Pending: "Pending",
          Failed: "Failed",
          Successful: "Successful",
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
      title: "Loan Status",
      dataIndex: "loanStatus",
      key: "loanStatus",
      render: (loanStatus: string) => {
        const statusColors: Record<string, string> = {
          Pending: "orange",
          Failed: "red",
          Open: "blue",
          PartiallySettled: "gold",
          FullySettled: "cyan",
          Overdue: "volcano",
          Defaulted: "magenta",
          UnderReview: "orange",
          Rejected: "red",
          Approved: "blue",
        };

        const displayName: Record<string, string> = {
          Pending: "Pending",
          Failed: "Failed",
          Open: "Open",
          PartiallySettled: "Partially Settled",
          FullySettled: "Fully Settled",
          Overdue: "Overdue",
          Defaulted: "Defaulted",
          UnderReview: "Under Review",
          Rejected: "Rejected",
          Approved: "Approved",
        };

        const color = statusColors[loanStatus] || "default";
        const label = displayName[loanStatus] || loanStatus;

        return (
          <Tag color={color} style={{ fontWeight: 500 }}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: MassMarketLoantData) => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                onClick={() => {
                  setSelectedMassMarketLoan(record);
                  setIsLoanDrawerVisible(true);
                }}
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
                <div className="  text-lg font-semibold  items-center pb-2">
                  ...
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
      <section className="w-full h-full hidden md:flex md:flex-col gap-4">
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for loan"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
        </div>
        <Table
          dataSource={apiResponse?.data || []}
          columns={loanColumns}
          rowKey="id"
          onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          pagination={{
            current: pageNumber ?? 1,
            pageSize: pageSize,
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
        title="Loan Details"
        width="50%"
        open={isLoanDrawerVisible}
        onClose={() => setIsLoanDrawerVisible(false)}
        closeIcon={true}
      >
        {selectedMassMarketLoan ? (
          <Card>
            <div className=" pb-4">
              <p className=" font-semibold pb-2">Personal Details</p>
              <Descriptions
                bordered={true}
                column={2}
                className=" text-slate-800"
              >
                <Descriptions.Item label=" First Name">
                  {selectedMassMarketLoan.borrowerFirstName}
                </Descriptions.Item>
                <Descriptions.Item label=" Last Name">
                  {selectedMassMarketLoan.borrowerLastName}
                </Descriptions.Item>
                <Descriptions.Item label="ID Number">
                  {selectedMassMarketLoan.borrowerIdNumber}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className=" pb-4">
              <p className=" font-semibold pb-2">Microfin Details</p>
              <Descriptions
                bordered={true}
                column={2}
                className=" text-slate-800"
              >
                <Descriptions.Item label=" Microfin Name">
                  {selectedMassMarketLoan.microfin.name}
                </Descriptions.Item>
                <Descriptions.Item label=" Microfin Number">
                  {selectedMassMarketLoan.microfin.contactNo}
                </Descriptions.Item>
                <Descriptions.Item label=" Email">
                  {selectedMassMarketLoan.microfin.email ?? "Not set"}
                </Descriptions.Item>
                <Descriptions.Item label=" Address">
                  {selectedMassMarketLoan.microfin.address}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className=" pb-4">
              <p className=" font-semibold pb-2">Loan Details</p>
              <Descriptions
                bordered={true}
                column={2}
                className=" text-slate-800"
              >
                <Descriptions.Item label=" Amount">
                  {selectedMassMarketLoan.amount}
                </Descriptions.Item>
                <Descriptions.Item label=" Interest Rate">
                  {selectedMassMarketLoan.interestRate}
                </Descriptions.Item>
                <Descriptions.Item label="Repayment Amount">
                  {selectedMassMarketLoan.repaymentAmount}
                </Descriptions.Item>
                <Descriptions.Item label=" Status">
                  {selectedMassMarketLoan.status}
                </Descriptions.Item>
                <Descriptions.Item label="Loan Status">
                  {selectedMassMarketLoan.loanStatus}
                </Descriptions.Item>
                <Descriptions.Item label="Maturity Date">
                  {dayjs(selectedMassMarketLoan.maturityDate).format(
                    "DD MMM YYYY"
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Date Created">
                  {dayjs(selectedMassMarketLoan.createdAt).format(
                    "DD MMM YYYY"
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Total Repayments">
                  {selectedMassMarketLoan.totalRepayments}
                </Descriptions.Item>
                <Descriptions.Item label="Transaction ID">
                  {selectedMassMarketLoan.transactionId}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Card>
        ) : (
          "Invalid"
        )}
      </Drawer>
    </div>
  );
};
