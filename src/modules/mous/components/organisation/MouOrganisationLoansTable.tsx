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
import Table, { ColumnsType, TableProps } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  MouLoansOrganisationData,
  MouOrganisationLoanTransactionData,
  useGetMouOrganisationLoanTransactionsQuery,
} from "@/api/queries/organisationQueries";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formaters";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import moment from "moment";
import Papa from "papaparse";
import saveAs from "file-saver";

type MouOrganisationProps = {
  MouOrganisationId: MouLoansOrganisationData;
};

export default function MouOrganisationLoansTable({
  MouOrganisationId,
}: MouOrganisationProps) {
  const [id, setId] = useState<number | null>(0);
  const [searchId, setSearchId] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [memberId, setMemberId] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<string>("");
  const [startRange, setStartRange] = useState<string>("");
  const [endRange, setendRange] = useState<string>("");
  const [isReportRequest, setIsReportRequest] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [status, setStatus] = useState<string[]>([]);
  const [loanStatus, setloanStatus] = useState<string[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<string[] | null>(null);
  const [filteredLoansStatus, setFilteredLoanStatus] = useState<
    string[] | null
  >(null);
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const { RangePicker } = DatePicker;

  //states to select organisation loan
  const [mouloan, setMouloan] = useState<MouOrganisationLoanTransactionData[]>(
    []
  );
  const [selectedLoan, setSelectedLoan] =
    useState<MouOrganisationLoanTransactionData>();
  const [isLoansDrawerVisible, setIsLoansDrawerVisible] =
    useState<boolean>(false);

  const { data: apiResponse, isFetching } =
    useGetMouOrganisationLoanTransactionsQuery({
      organisationId: Number(localStorage.getItem("organizationId")),
      mouOrganisationId: MouOrganisationId.id,
      memberId: memberId,
      loanStatus: loanStatus ?? [],
      query: searchQuery,
      transactionType: transactionType,
      status: filteredStatus ?? [],
      startRange,
      endRange,
      isReportRequest: isReportRequest,
      pageSize: pageSize ?? 10,
      pageNumber: pageNumber ?? 1,
      id: id ?? 0,
    });

  useEffect(() => {
    if (apiResponse?.data.length) {
      setMouloan(apiResponse.data);
    }
  }, [apiResponse]);

  const handleViewMouLoans = (loanId: number) => {
    if (loanId && apiResponse) {
      const loan = mouloan.find((a) => a.id == loanId);
      setSelectedLoan(loan);
    }

    if (mouloan) {
      setIsLoansDrawerVisible(true);
    }
  };

  const MouOrgLoansColumns: ColumnsType<MouOrganisationLoanTransactionData> = [
    {
      title: "Full Name",
      dataIndex: "member",
      key: "member",
      render: (_, record: MouOrganisationLoanTransactionData) =>
        `${record.member.firstName} ${record.member.lastName}`,
    },
    {
      title: "Phone ",
      key: "member",
      render: (_, record: MouOrganisationLoanTransactionData) =>
        record.member.phoneNumber,
    },
    {
      title: "Emp ID",
      key: "member",
      render: (_, record: MouOrganisationLoanTransactionData) =>
        record.member.employeeId,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "member",
      render: (_, record: MouOrganisationLoanTransactionData) =>
        formatCurrency(record.amount),
    },
    // {
    //   title: "Interest (%)",
    //   dataIndex: "product",
    //   key: "member",
    //   render: (_, record: MouOrganisationLoanTransactionData) =>
    //     `${record.product.interestRate}%`,
    // },
    {
      title: "Interest",
      dataIndex: "initialInterestAmount",
      key: "initialInterestAmount",
      render: (_, record: MouOrganisationLoanTransactionData) =>
        `${formatCurrency(record.initialInterestAmount)}`,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status: string) => {
    //     const statusColors: Record<string, string> = {
    //       Pending: "orange",
    //       Failed: "red",
    //       Successful: "green",
    //     };

    //     const displayName: Record<string, string> = {
    //       Pending: "Pending",
    //       Failed: "Failed",
    //       Successful: "Successful",
    //     };

    //     const color = statusColors[status] || "default";
    //     const label = displayName[status] || status;

    //     return (
    //       <Tag color={color} style={{ fontWeight: 500 }}>
    //         {label}
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: "Loan Status",
      dataIndex: "loanStatus",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Failed", value: "Failed" },
        { text: "Open", value: "Open" },
        { text: "Partially Settled", value: "PartiallySettled" },
        { text: "Fully Settled", value: "FullySettled" },
        { text: "Overdue", value: "Overdue" },
        { text: "Defaulted", value: "Defaulted" },
        { text: "UnderReview", value: "UnderReview" },
        { text: "Rejected", value: "Rejected" },
        { text: "Approved", value: "Approved" },
      ],
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          Open: "green",
          Failed: "red",
          Successful: "blue",
          PartiallySettled: "purple",
          FullySettled: "blue",
          Pending: "magenta",
          Overdue: "volcano",
          Defaulted: "lime",
          UnderReview: "cyan",
          Rejected: "#f50",
        };

        const displayName: Record<string, string> = {
          Open: "Open",
          Failed: "Failed",
          Successful: "Successful",
          PartiallySettled: "PartiallySettled",
          FullySettled: "FullySettled",
          Pending: "Pending",
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
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_, record: MouOrganisationLoanTransactionData) =>
        record.product.name,
    },
    {
      title: "Microfin ",
      dataIndex: "mou",
      key: "mou",
      render: (_, record: MouOrganisationLoanTransactionData) =>
        record.mou.microfin.name,
    },
    {
      title: "Date Created ",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: MouOrganisationLoanTransactionData) => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                onClick={() => handleViewMouLoans(record.id)}
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

  const handleTableChange: TableProps<MouOrganisationLoanTransactionData>["onChange"] =
    (pagination, filters, sorter) => {
      setPageNumber(pagination.current ?? 1);
      setPageSize(pagination.pageSize ?? 10);

      if (filters.loanStatus && filters.loanStatus.length > 0) {
        const selectedLoanStatus = filters.loanStatus as string[];
        setloanStatus(selectedLoanStatus);
        setFilteredLoanStatus(selectedLoanStatus);
      } else {
        setloanStatus([]);
        setFilteredLoanStatus(null);
      }

      if (filters.status && filters.status.length > 0) {
        const selectedStatuses = filters.status as string[];
        setStatus(selectedStatuses);
        setFilteredStatus(selectedStatuses);
      } else {
        setStatus([]);
        setFilteredStatus(null);
      }
    };

  const handleSearch = (values: string) => {
    setSearchId(searchId);
    setSearchQuery(values.trim());
  };
  const handleSearchClear = () => {
    setSearchId(searchId);
  };

  const exportCSV = () => {};

  return (
    <div>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <div className="w-full flex gap-2">
          <DebouncedInputField
            placeholder="Search for proposal"
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
          columns={MouOrgLoansColumns}
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
        title={`${selectedLoan?.member.firstName} ${selectedLoan?.member.lastName}`}
        width="45%"
        open={isLoansDrawerVisible}
        onClose={() => setIsLoansDrawerVisible(false)}
      >
        <Card>
          <div>
            <p className=" pb-4">Loan Details</p>
            <Descriptions column={2} bordered={true}>
              <Descriptions.Item label="Amount">
                {formatCurrency(Number(selectedLoan?.amount))}
              </Descriptions.Item>
              <Descriptions.Item label="Loan Id">
                {selectedLoan?.loanId}
              </Descriptions.Item>
              <Descriptions.Item label="Loan Status">
                {selectedLoan?.loanStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Txn Id">
                {selectedLoan?.transactionId}
              </Descriptions.Item>
              <Descriptions.Item label="Lipila later Code">
                {selectedLoan?.lipilaBusinessCode ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Recipient Phone">
                {selectedLoan?.recipientMobileNumber ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction Phone">
                {selectedLoan?.transactionMobileNumber ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction Type">
                {selectedLoan?.transactionType ?? "Not set"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Date Created">
                {new Date(selectedLoan?.createdAt).toLocaleDateString() ?? "Not set"}
              </Descriptions.Item> */}
              <Descriptions.Item label="Status">
                {selectedLoan?.status ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction Date">
                {selectedLoan?.transactionDate ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Maturity Date">
                {selectedLoan?.maturityDate ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Interest Amount">
                {selectedLoan?.initialInterestAmount ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Amount Paid">
                {selectedLoan?.amountPaid ?? "Not set"}
              </Descriptions.Item>
              <Descriptions.Item label="Balance">
                {selectedLoan?.balance ?? "Not set"}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className=" pt-4">
            <p className=" pb-4">Personal Details</p>
            <Descriptions column={2} bordered={true}>
              <Descriptions.Item label="Employee ID">
                {selectedLoan?.member.employeeId}
              </Descriptions.Item>
              <Descriptions.Item label="Position">
                {selectedLoan?.member.position}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedLoan?.member.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedLoan?.member.phoneNumber}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className=" py-4">
            <p className=" pb-4">Organisation Details</p>
            <Descriptions column={2} bordered={true}>
              <Descriptions.Item label="Name">
                {selectedLoan?.mou.organization.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedLoan?.mou.organization.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedLoan?.mou.organization.contactNo}
              </Descriptions.Item>
              <Descriptions.Item label="Tpin">
                {selectedLoan?.mou.organization.tPinNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Sector">
                {selectedLoan?.mou.organization.sector}
              </Descriptions.Item>
              <Descriptions.Item label="Is Active">
                {selectedLoan?.mou.organization.isDeactivated ? "Yes" : "No"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {selectedLoan?.mou.organization.address}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className=" py-4">
            <p className=" pb-4">Microfin Details</p>
            <Descriptions column={2} bordered={true}>
              <Descriptions.Item label="Name">
                {selectedLoan?.mou.microfin.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedLoan?.mou.microfin.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedLoan?.mou.microfin.contactNo}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {selectedLoan?.mou.microfin.address}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      </Drawer>
    </div>
  );
}
