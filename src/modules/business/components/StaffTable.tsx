import {
  StaffMembersData,
  useGetStaffMembersQuery,
} from "@/api/queries/summaryQueries";
import { Button, Drawer, Dropdown, MenuProps, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { useState } from "react";
import { customLoader } from "@/components/table-loader";
import { StaffMemberForm } from "./StaffMemberForm";

type StaffTableProps = {
  showCreateButton?: boolean;
};

export const branchesColumns: ColumnsType<StaffMembersData> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "FullName",
    dataIndex: "user",
    render: (_, record: StaffMembersData) =>
      `${record.user.firstName + " " + record.user.lastName} `,
  },
  {
    title: "Email",
    dataIndex: "user",
    render: (_, record: StaffMembersData) => record?.user.email ?? "NA",
  },

  {
    title: "Organisation",
    dataIndex: "organization",
    render: (_, record: StaffMembersData) => record.organization.name,
  },
  {
    title: "National ID",
    dataIndex: "idNumber",
    key: "idNumber",
  },
  {
    title: "Actions",
    key: "actions",
    render: () => {
      const items: MenuProps["items"] = [
        {
          key: "4",
          label: (
            <span className="flex gap-2" onClick={() => alert("View CLicked")}>
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

export const StaffTable: React.FC<StaffTableProps> = ({
  showCreateButton = true,
}) => {
  const [id, setSearchId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: staffResponse, isFetching } = useGetStaffMembersQuery({
    id: id,
    query: searchQuery,
    organizationId: Number(localStorage.getItem("organizationId")),
    pageNumber: pageNumber ?? 1,
    pageSize: pageSize,
  });

  const handleTableChange = (pagination: any) => {
    setPageNumber(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearch = () => {
    setSearchId(id);
  };

  const handleSearchClear = () => {
    setSearchId(id);
  };

  return (
    <div className=" mt-2">
      {" "}
      <p className=" font-semibold">Organisation Staff Members</p>
      <section className="w-full h-full py-3 flex   gap-2 ">
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for Staff Member"
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
              Add Staff Member
            </Button>
          </div>
        )}
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          dataSource={staffResponse?.data || []}
          columns={branchesColumns}
          rowKey="id"
          onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          pagination={{
            current: pageNumber ?? 1,
            pageSize: pageSize,
            total: staffResponse?.totalItems,
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
        title="Create Staff Member"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="40%"
      >
        <StaffMemberForm />
      </Drawer>
    </div>
  );
};
