import {
  MicrofinOrgStaffMembersData,
  OrganisationData,
  useGetMicrofinOrgStaffMembersQuery,
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
import { useState } from "react";
import { customLoader } from "@/components/table-loader";
import { MicrofinOrgStaffMemberForm } from "./MIcrofinOrgStaffMemberForm";
import { MicrofinOrgLoansTable } from "../Loans/MicrofinOrgLoansTable";
import { MainMicrofinOrgLoansTable } from "../Loans/MainMicrofinOrgLoansTable";

type StaffTableProps = {
  showCreateButton?: boolean;
  microfinOrganisationId: number;
  microfinMemberId: number;
};

export const MicrofinOrgStaffTable: React.FC<StaffTableProps> = ({
  showCreateButton = true,
  microfinOrganisationId,
  microfinMemberId,
}) => {
  const [id, setSearchId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStaffMember, setSelectedStaffMember] =
    useState<MicrofinOrgStaffMembersData | null>(null);
  const [isLoansDrawerVisible, setIsLoansDrawerVisible] = useState(false);
  const [isStaffDrawerVisble, setIsStaffDrawerVisble] = useState(false);

  const { data: staffResponse, isFetching } =
    useGetMicrofinOrgStaffMembersQuery({
      id: Number(localStorage.getItem("organizationId")),
      query: searchQuery,
      organizationId: microfinOrganisationId,
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    });

  const handleTableChange = (pagination: any) => {
    setPageNumber(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearch = (values: string) => {
    setSearchId(id);
    setSearchQuery(values.trim());
  };

  const handleSearchClear = () => {
    setSearchId(id);
  };

  const branchesColumns: ColumnsType<MicrofinOrgStaffMembersData> = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "FullName",
      dataIndex: "user",
      render: (_, record: MicrofinOrgStaffMembersData) =>
        `${record.user.firstName + " " + record.user.lastName} `,
    },
    {
      title: "Email",
      dataIndex: "user",
      render: (_, record: MicrofinOrgStaffMembersData) =>
        record?.user.email ?? "NA",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "ID Type",
      dataIndex: "idType",
      key: "idType",
    },
    {
      title: "National ID",
      dataIndex: "idNumber",
      key: "idNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: MicrofinOrgStaffMembersData) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <span
                className="flex gap-2"
                onClick={() => {
                  setSelectedStaffMember(record);
                  setIsStaffDrawerVisble(true);
                }}
              >
                <EyeOutlined />
                View
              </span>
            ),
          },
          {
            key: "2",
            label: (
              <span
                className="flex gap-2"
                onClick={() => {
                  setSelectedStaffMember(record);
                  setIsLoansDrawerVisible(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                Create Loan
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
    <div className=" ">
      {/* <p className=" font-semibold">Organisation Staff Members</p> */}
      <section className="w-full h-full  flex   gap-2 ">
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
        <MicrofinOrgStaffMemberForm
          microfinOrganisationId={microfinOrganisationId}
        />
      </Drawer>
      <Drawer
        width="60%"
        open={isLoansDrawerVisible}
        onClose={() => setIsLoansDrawerVisible(false)}
        closeIcon={true}
      >
        {selectedStaffMember ? (
          <div>
            <Card
              title={`${selectedStaffMember.user.firstName} ${selectedStaffMember.user.lastName} - Loans`}
            >
              <div className=" pt-8">
                <MicrofinOrgLoansTable
                  microfinOrganisationId={microfinOrganisationId}
                  microfinMemberId={selectedStaffMember.id}
                />
              </div>
            </Card>
          </div>
        ) : (
          "Invalid process"
        )}
      </Drawer>
      <Drawer
        title="Client Details"
        width="70%"
        open={isStaffDrawerVisble}
        onClose={() => setIsStaffDrawerVisble(false)}
        closeIcon={true}
      >
        {" "}
        {selectedStaffMember ? (
          <div>
            <Card>
              <div className=" pb-4">
                <p className=" font-semibold pb-2">Personal Details</p>
                <Descriptions
                  bordered={true}
                  column={2}
                  className=" text-slate-800"
                >
                  <Descriptions.Item label="First Name">
                    {selectedStaffMember.user.firstName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Name">
                    {selectedStaffMember.user.lastName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Email">
                    {selectedStaffMember.user.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {selectedStaffMember.user.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="ID Number">
                    {selectedStaffMember.idNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="ID Type">
                    {selectedStaffMember.idType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Position">
                    {selectedStaffMember.position}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <div className=" ">
                <p className=" font-semibold pb-2">Bank Details</p>
                <Descriptions
                  bordered={true}
                  column={2}
                  className=" text-slate-800"
                >
                  <Descriptions.Item label="Bank Name">
                    {selectedStaffMember.bankDetails.name ?? "Not Set"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Branch Name">
                    {selectedStaffMember.bankDetails.branch ?? "Not Set"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Branch Code">
                    {selectedStaffMember.bankDetails.code ?? "Not Set"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Account Number">
                    {selectedStaffMember.bankDetails.accountNumber ?? "Not Set"}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className=" pt-8">
                {" "}
                <p className=" font-semibold pb-2"> Loans</p>
                <MainMicrofinOrgLoansTable
                  microfinOrganisationId={microfinOrganisationId}
                  microfinMemberId={selectedStaffMember.id}
                />
              </div>
            </Card>
          </div>
        ) : (
          "Invalid process"
        )}
      </Drawer>
    </div>
  );
};
