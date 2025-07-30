import {
  MouOrganisationRepaymentsData,
  useGetMouOrganisationRepaymentTransactionsQuery,
} from "@/api/queries/organisationQueries";
import { customLoader } from "@/components/table-loader";
import {
  Button,
  DatePicker,
  Dropdown,
  MenuProps,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createHandleTableChange } from "@/utils/HandleTableChange";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { formatCurrency } from "@/utils/formaters";
import moment from "moment";
import Papa from "papaparse";
import saveAs from "file-saver";

export const TransactionRepaymentsTable = () => {
  const [id, setId] = useState<number | null>(0);
  const [searchId, setSearchId] = useState<string>("");
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
  const [mouOrganisationId, setMouOrganisationId] = useState<number>(0);
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);

  const { RangePicker } = DatePicker;

  const [Repayments, setRepayments] = useState<MouOrganisationRepaymentsData[]>(
    []
  );

  const { data: apiResponse, isFetching } =
    useGetMouOrganisationRepaymentTransactionsQuery({
      organisationId: Number(localStorage.getItem("organizationId")),
      mouOrganisationId: mouOrganisationId,
      memberId: memberId,
      loanStatus: loanStatus,
      query: searchQuery,
      transactionType: transactionType,
      status: status,
      startRange: dateRange ? dateRange[0].toISOString() : "",
      endRange: dateRange ? dateRange[1].toISOString() : "",
      isReportRequest: isReportRequest,
      pageSize: pageSize ?? 10,
      pageNumber: pageNumber ?? 1,
      id: id ?? 0,
    });
  const MouRepaymensColumns: ColumnsType<MouOrganisationRepaymentsData> = [
    {
      title: "Full Name",
      render: (_, record: MouOrganisationRepaymentsData) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record: MouOrganisationRepaymentsData) =>
        formatCurrency(record.amount),
    },
    {
      title: "Transaction ID ",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Status",
      dataIndex: "transactionStatus",
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
      title: "Date Created ",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: MouOrganisationRepaymentsData) => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                // onClick={() => handleViewMouLoans(record.id)}
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

  const handleTableChange =
    createHandleTableChange<MouOrganisationRepaymentsData>({
      setPageNumber,
      setPageSize,
    });

  const handleSearch = (values: string) => {
    setSearchId(searchId);
    setSearchQuery(values.trim());
  };
  const handleSearchClear = () => {
    setSearchId(searchId);
  };

  useEffect(() => {
    setRepayments(apiResponse?.data || []);
  });

  const exportCSV = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const modifiedCsv = Repayments.map((item) => ({
      Id: item.id,
      TransactionId: item.transactionId,
      OrganisationMemberId: item.organizationMemberId,
      FullName: item.firstName + " " + item.lastName,
      Amount: item.amount,
      TransactionStatus: item.transactionStatus,
      DateCreated: new Date(item.createdAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    }));

    const csvMod = Papa.unparse(modifiedCsv);
    const blob = new Blob([csvMod], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `Repayments_Report_${currentDate}`);
  };

  return (
    <section className="w-full h-full hidden md:flex md:flex-col">
      <div className="w-full flex gap-2">
        <DebouncedInputField
          placeholder="Search for Repayments"
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
        <Button onClick={exportCSV} className=" text-slate-500">
          <ExportOutlined className=" text-slate-500" />
          Export
        </Button>
      </div>
      <Table
        dataSource={apiResponse?.data}
        columns={MouRepaymensColumns}
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
  );
};
