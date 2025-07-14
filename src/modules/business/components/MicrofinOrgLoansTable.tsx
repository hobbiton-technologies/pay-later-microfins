import { MicrofinLoansData } from "@/api/queries/summaryQueries";
import { Button, Drawer, Dropdown, MenuProps, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { useEffect, useState } from "react";
import { MicrofinOrgLoansForm } from "./MicrofinOrgLoansForm";
import {
  GetMicrofinLoansData,
  useGetMicrofinLoansQuery,
} from "@/api/queries/loansQueries";

type MicrofinOrgLoansTableProps = {
  showCreateButton?: boolean;
  microfinOrganisationId: number;
  microfinMemberId: number; // Add this prop
};

export const loansColumns: ColumnsType<GetMicrofinLoansData> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Member Name",
    render: (_, record: GetMicrofinLoansData) =>
      `${record.member.user.firstName} + ${record.member.user.lastName}`,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Interest Amount",
    dataIndex: "interestRate",
    key: "interestRate",
  },
  {
    title: "Loan Status",
    dataIndex: "loanStatus",
    key: "loanStatus",
  },
  {
    title: "Interest Rate",
    dataIndex: "interestRate",
    key: "interestRate",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Penalty Calculation Method",
    dataIndex: "penaltyCalculationMethod",
    key: "penaltyCalculationMethod",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Actions",
    key: "actions",
    render: () => {
      const items: MenuProps["items"] = [
        {
          key: "1",
          label: (
            <span className="flex gap-2" onClick={() => alert("View Clicked")}>
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

export const MicrofinOrgLoansTable: React.FC<MicrofinOrgLoansTableProps> = ({
  showCreateButton = true,
  microfinOrganisationId,
  microfinMemberId,
}) => {
  const [id, setSearchId] = useState<string>("");
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loanStatus, setloanStatus] = useState<string>("");
  const [startDate, setstartDate] = useState<string>("");
  const [endDate, setendDate] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = () => {
    setSearchId(id);
    setSearchQuery(searchQuery);
  };

  const handleSearchClear = () => {
    setSearchId(id);
  };

  const { data: apiResponse, isFetching } = useGetMicrofinLoansQuery({
    id: Number(localStorage.getItem("organizationId")),
    memberid: microfinMemberId,
    microfinOrganisationId: microfinOrganisationId,
    query: searchQuery,
    loanStatus: loanStatus,
    startDate: startDate,
    endDate: endDate,
    pageNumber: pageNumber ?? 1,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (apiResponse) {
    }
  });
  return (
    <div>
      <section className="w-full h-full py-3 flex   gap-2 ">
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for Microfin Organisation loan"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
        </div>

        {showCreateButton && (
          <div className="flex gap-3">
            <Button
              type="primary"
              onClick={() => setIsCreateDrawerVisible(true)}
            >
              <ExportOutlined />
              Create Loan
            </Button>
          </div>
        )}
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          dataSource={apiResponse?.data || []}
          columns={loansColumns}
          rowKey="id"
          // onChange={handleTableChange}
          // loading={{
          //   spinning: isFetching,
          //   indicator: customLoader,
          // }}
          // pagination={{
          //   current: pageNumber ?? 1,
          //   pageSize: pageSize,
          //   total: staffResponse?.totalItems,
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
        title="Create Loan"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="40%"
      >
        <MicrofinOrgLoansForm
          microfinOrganisationId={microfinOrganisationId}
          microfinMemberId={microfinMemberId}
        />
      </Drawer>
    </div>
  );
};
