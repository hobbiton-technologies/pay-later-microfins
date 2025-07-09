import {
  MicrofinOrgStaffMembersData,
  MicrofinStaffMembersData,
  useGetMicrofinOrgStaffMembersQuery,
  useGetMicrofinStaffMembersQuery,
} from "@/api/queries/summaryQueries";
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { useEffect, useState } from "react";
import { customLoader } from "@/components/table-loader";
import { StaffMemberForm } from "./StaffMemberForm";
import { MicrofinOrgStaffTable } from "./MicrofinOrgStaffTable";

export const MicrofinStaffTable = () => {
  const [id, setSearchId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [staffMembers, setStaffMembers] = useState<MicrofinStaffMembersData[]>(
    []
  );
  const [selectedStaffMembers, setSelectedStaffMembers] =
    useState<MicrofinStaffMembersData>();
  const [isStaffMembersDrawerVisible, setIsStaffMembersDrawerVisible] =
    useState(false);

  const { data: staffResponse, isFetching } = useGetMicrofinStaffMembersQuery({
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

  useEffect(() => {
    if (staffResponse?.data) {
      setStaffMembers(staffResponse.data);
    }
  });
  const handleViewStaffMember = (staffMemberId: number) => {
    if (staffMemberId && staffResponse) {
      const staffMember = staffMembers.find((a) => a.id === staffMemberId);
      setSelectedStaffMembers(staffMember);

      if (staffMember) {
        setIsStaffMembersDrawerVisible(true);
      }
    }
  };

  const membersColumns = (
    handleViewStaffMember: (id: number) => void
  ): ColumnsType<MicrofinStaffMembersData> => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "FullName",
      dataIndex: "user",
      render: (_, record: MicrofinStaffMembersData) =>
        `${
          record?.user.firstName ?? "NA" + " " + record?.user.lastName ?? "NA"
        } `,
    },
    {
      title: "Email",
      dataIndex: "user",
      render: (_, record: MicrofinStaffMembersData) =>
        record?.user.email ?? "NA",
    },

    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      render: (_, record: MicrofinStaffMembersData) => record?.branch ?? "NA",
    },
    {
      title: "EmployeeId Number",
      dataIndex: "employeeIdNumber",
      key: "employeeIdNumber",
      render: (_, record: MicrofinStaffMembersData) =>
        record?.employeeIdNumber ?? "NA",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (_, record: MicrofinStaffMembersData) => record?.position ?? "NA",
    },
    {
      title: "National ID",
      dataIndex: "idNumber",
      key: "idNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: MicrofinStaffMembersData) => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                onClick={() => handleViewStaffMember(record.id)}
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

        <div className="flex gap-3">
          <Button type="primary" onClick={() => setIsCreateDrawerVisible(true)}>
            <ExportOutlined />
            Add Staff Member
          </Button>
        </div>
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          dataSource={staffResponse?.data || []}
          columns={membersColumns(handleViewStaffMember)}
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
      <Drawer
        width="50%"
        open={isStaffMembersDrawerVisible}
        onClose={() => setIsStaffMembersDrawerVisible(false)}
        closeIcon={true}
      >
        {selectedStaffMembers ? (
          <div>
            <Card title="Organisation Details">
              <Descriptions bordered={true} column={1} className="text-black">
                <Descriptions.Item label="Organisation Id">
                  {selectedStaffMembers.id}
                </Descriptions.Item>
                <Descriptions.Item label="Organisation Number">
                  {selectedStaffMembers.branch}
                </Descriptions.Item>
                <Descriptions.Item label="Organisation Name">
                  {selectedStaffMembers.employeeIdNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Org Microfin ID">
                  {selectedStaffMembers.idNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Org Microfin Name">
                  {selectedStaffMembers.isMicrofinAdmin}
                </Descriptions.Item>
                <Descriptions.Item label="Org Microfin Address">
                  {selectedStaffMembers.position}
                </Descriptions.Item>
                <Descriptions.Item label="Org Microfin Email">
                  {selectedStaffMembers.updatedAt}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
        ) : (
          "Invalid process"
        )}
      </Drawer>
    </div>
  );
};
