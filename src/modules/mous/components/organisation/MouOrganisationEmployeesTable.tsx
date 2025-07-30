import {
  MouLoansOrganisationData,
  MouLoansOrganisationMembers,
  useGetMouLoansOrganisationsQuery,
  useGetMouOrgStaffMembersQuery,
} from "@/api/queries/organisationQueries";

import {
  Button,
  Card,
  DatePicker,
  Descriptions,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  MicrofinOrgStaffMembersData,
  useGetMicrofinOrgStaffMembersQuery,
} from "@/api/queries/summaryQueries";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formaters";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import moment from "moment";
import Papa from "papaparse";
import { saveAs } from "file-saver";

type MouOrganisationEmployeesProps = {
  MouOrganisationId: MouLoansOrganisationData;
};

export default function MouOrganisationEmployeesTable({
  MouOrganisationId,
}: MouOrganisationEmployeesProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [mouEmployees, setMouEmployees] = useState<MouLoansOrganisationData>();
  const [mouEmployeesarray, setmouEmployeesarray] = useState<
    MouLoansOrganisationData[]
  >([]);
  const { RangePicker } = DatePicker;

  const [searchInput] = useState<string>("");
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);

  const [selectedOrganisation, setSelectedOrganisation] =
    useState<MouLoansOrganisationData>();

  const [isEmployeesDrawerVisible, setIsEmployeesDrawerVisible] =
    useState<boolean>(false);

  const { data: apiResponse, isFetching } = useGetMouLoansOrganisationsQuery({
    id: Number(localStorage.getItem("organizationId")),
    // organizationId: MouOrganisationId.id,
    query: searchQuery,
    pageSize: pageSize ?? 10,
    pageNumber: pageNumber ?? 1,
  });

  useEffect(() => {
    if (apiResponse?.data?.length) {
      setMouEmployees(apiResponse.data[0]); // Just the first org
    }
  }, [apiResponse]);

  const handleViewEmployess = (employeeId: number) => {
    if (employeeId && apiResponse) {
      const employee = mouEmployeesarray.find((a) => a.id == employeeId);
      setSelectedOrganisation(employee);
    }

    if (mouEmployees) {
      setIsEmployeesDrawerVisible(true);
    }
  };

  useEffect(() => {
    if (selectedOrganisation) {
      setIsEmployeesDrawerVisible(true);
    }
  }, [selectedOrganisation]);

  const mouOrganisationEmployees: ColumnsType<MouLoansOrganisationData> = [
    {
      title: "Full Name",
      render: (_, record: MouLoansOrganisationData) => {
        const member = record.members?.[0];
        return member
          ? `${member.user.firstName} ${member.user.lastName}`
          : "N/A";
      },
    },
    {
      title: "Phone Number",
      render: (_, record: MouLoansOrganisationData) => {
        const phone = record.members?.[0];
        return phone ? `${phone.user.phoneNumber}` : "NA";
      },
    },
    {
      title: "Email",
      render: (_, record: MouLoansOrganisationData) => {
        const email = record.members?.[0];
        return email ? `${email.user.email}` : "NA";
      },
    },
    {
      title: "Position",
      render: (_, record: MouLoansOrganisationData) => {
        const position = record.members?.[0];
        return position ? `${position.position}` : "NA";
      },
    },
    {
      title: "Employee ID",
      render: (_, record: MouLoansOrganisationData) => {
        const employeeId = record.members?.[0];
        return employeeId ? `${employeeId.employeeIdNumber}` : "NA";
      },
    },
    {
      title: "ID Type",
      render: (_, record: MouLoansOrganisationData) => {
        const idType = record.members?.[0];
        return idType ? `${idType.idType}` : "NA";
      },
    },
    {
      title: "ID Number",
      render: (_, record: MouLoansOrganisationData) => {
        const idNumber = record.members?.[0];
        return idNumber ? `${idNumber.idNumber}` : "NA";
      },
    },
    {
      title: "Is Admin",
      render: (_, record: MouLoansOrganisationData) => {
        const isAdmin = record.members?.[0]?.isOrganisationAdmin;

        let color = "default";
        let text = "NA";

        if (isAdmin === true) {
          color = "green";
          text = "Yes";
        } else if (isAdmin === false) {
          color = "cyan";
          text = "No";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Enabled",
      render: (_, record: MouLoansOrganisationData) => {
        const enabled = record.members?.[0].isEnabled;
        let color = "default";
        let text = "NA";

        if (enabled === true) {
          color = "green";
          text = "Yes";
        } else if (enabled === false) {
          color = "cyan";
          text = "No";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Max Loan Per Month",
      render: (_, record: MouLoansOrganisationData) => {
        const maxLoan = record.members?.[0];
        return maxLoan
          ? `${formatCurrency(maxLoan.maximumLoanAmountPerMonth)}`
          : "NA";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: MouLoansOrganisationData) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <span
                className="flex gap-2"
                onClick={() => handleViewEmployess(record.id)}
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
                <div className="  text-lg font-semibold  items-center ">
                  <EllipsisOutlined />
                </div>
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const handleTableChange: TableProps<MouLoansOrganisationData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setPageNumber(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
  };

  const handleSearchClear = () => {
    setSearchQuery(searchInput);
  };

  const exportCSV = () => {};

  return (
    <div>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <div className="w-full flex gap-2">
          <DebouncedInputField
            placeholder="Search for Empolyee"
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
          columns={mouOrganisationEmployees}
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
        title={`${mouEmployees?.members[0].user.firstName} ${mouEmployees?.members[0].user.lastName}`}
        width="45%"
        open={isEmployeesDrawerVisible}
        onClose={() => setIsEmployeesDrawerVisible(false)}
      >
        <section>
          <Card className="">
            <div>
              <Descriptions column={1} bordered={true}>
                <Descriptions.Item label="Contact No">
                  {mouEmployees?.members[0].user.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {mouEmployees?.members[0].user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Is System Admin">
                  {mouEmployees?.members[0].user.isSystemAdmin ? "Yes" : "No"}
                </Descriptions.Item>
                <Descriptions.Item label="Position">
                  {mouEmployees?.members[0].position}
                </Descriptions.Item>
                <Descriptions.Item label="ID Type">
                  {mouEmployees?.members[0].idType}
                </Descriptions.Item>
                <Descriptions.Item label="ID Number">
                  {mouEmployees?.members[0].idNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Employee Number">
                  {mouEmployees?.members[0].employeeIdNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Is Enabled">
                  {mouEmployees?.members[0].isEnabled ? "Yes" : "No"}
                </Descriptions.Item>
                <Descriptions.Item label="Is Organisation Admin">
                  {mouEmployees?.members[0].isOrganisationAdmin ? "Yes" : "No"}
                </Descriptions.Item>
                <Descriptions.Item label="Maximun Loan Amount">
                  {formatCurrency(
                    Number(mouEmployees?.members[0].maximumLoanAmountPerMonth)
                  )}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Card>
        </section>
      </Drawer>
    </div>
  );
}
