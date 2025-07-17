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
} from "antd";
import { ColumnsType } from "antd/es/table";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { formatCurrency } from "@/utils/formaters";
import { TimerIcon } from "lucide-react";

export const MassMarketLoansTable = () => {
  const [id, setId] = useState<number>(1);
  const [clientId, setClientId] = useState<number>(1);
  const [status, setStatus] = useState<string[]>([]);
  const [loanStatus, setloanStatus] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    query: query,
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

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  const handleSearchClear = () => {
    setSearchQuery(searchQuery);
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
      dataIndex: "idNumber",
      key: "idNumber",
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
      render: (_, record: MassMarketLoantData) => `${record.amount}%`,
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
    },
    {
      title: "Loan Status",
      dataIndex: "loanStatus",
      key: "loanStatus",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
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
                <EyeOutlined />
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
        <div>
          <AnimatedHeader title="Mass Market Loans" />
          <p className="text-slate-500 text-xs">Manage your loans</p>
        </div>
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
          // onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          // pagination={{
          //   current: pageNumber ?? 1,
          //   pageSize: pageSize,
          //   total: microfinBranches?.totalItems,
          // }}
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
                  {selectedMassMarketLoan.maturityDate}
                </Descriptions.Item>
                <Descriptions.Item label="Date Created">
                  {selectedMassMarketLoan.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label="Total Repayments">
                  {selectedMassMarketLoan.totalRepayments}
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
