import { MenuProps, Space, Dropdown, Button, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import {
  MouLoansOrganisationData,
  MouOrganisationLoanTransactionData,
  useGetMouOrganisationLoanTransactionsQuery,
} from "@/api/queries/organisationQueries";
import { useState } from "react";
import { formatCurrency } from "@/utils/formaters";
import { customLoader } from "@/components/table-loader";

type MouOrganisationProps = {
  MouOrganisationId: MouLoansOrganisationData;
};

export default function MouOrganisationLoansTable({
  MouOrganisationId,
}: MouOrganisationProps) {
  const [id, setId] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [memberId, setMemberId] = useState<number>(0);
  const [loanStatus, setloanStatus] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [startRange, setStartRange] = useState<string>("");
  const [endRange, setendRange] = useState<string>("");
  const [isReportRequest, setIsReportRequest] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setPageNumber] = useState<number | null>(1);

  const { data: apiResponse, isFetching } =
    useGetMouOrganisationLoanTransactionsQuery({
      organisationId: Number(localStorage.getItem("organizationId")),
      mouOrganisationId: MouOrganisationId.id,
      memberId: memberId,
      loanStatus: loanStatus,
      query: searchQuery,
      transactionType: transactionType,
      status: status,
      startRange,
      endRange,
      isReportRequest: isReportRequest,
      pageSize: pageSize ?? 10,
      pageNumber: pageNumber ?? 1,
      id: id ?? 0,
    });

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
    {
      title: "Interest (%)",
      dataIndex: "initialInterestAmount",
      key: "member",
      render: (_, record: MouOrganisationLoanTransactionData) =>
        formatCurrency(record.initialInterestAmount),
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
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          Open: "blue",
          Failed: "red",
          Successful: "green",
        };

        const displayName: Record<string, string> = {
          Open: "Open",
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
          dataSource={apiResponse?.data}
          columns={MouOrgLoansColumns}
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
}
