import {
  MouLoansOrganisationData,
  useGetMouOrgStaffMembersQuery,
} from "@/api/queries/organisationQueries";
import { Button, Dropdown, MenuProps, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  MicrofinOrgStaffMembersData,
  useGetMicrofinOrgStaffMembersQuery,
} from "@/api/queries/summaryQueries";
import { useState } from "react";

type MouOrganisationEmployeesProps = {
  MouOrganisationId: MouLoansOrganisationData;
};

export default function MouOrganisationEmployeesTable({
  MouOrganisationId,
}: MouOrganisationEmployeesProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setPageNumber] = useState<number | null>(1);

  const { data: apiResponse, isFetching } = useGetMouOrgStaffMembersQuery({
    id: Number(localStorage.getItem("organizationId")),
    organizationId: MouOrganisationId.id,
    query: searchQuery,
    pageSize: pageSize ?? 10,
    pageNumber: pageNumber ?? 1,
  });

  const mouOrganisationEmployees: ColumnsType<MicrofinOrgStaffMembersData> = [
    {
      title: "Full Name",
      render: (_, record: MicrofinOrgStaffMembersData) =>
        `${record.user.firstName} ${record.user.lastName}`,
    },
    {
      title: "Phone Number",
    },
    {
      title: "Email",
    },
    {
      title: "Position",
    },
    {
      title: "Employee ID",
    },
    {
      title: "ID Type",
    },
    {
      title: "ID Number",
    },
    {
      title: "Administrative Role",
    },
    {
      title: "Enabled",
    },
    {
      title: "Max Loan Per Month",
    },
    {
      title: "Actions",
      key: "actions",
      //   render: (record: MouLoansOrganisationData) => {
      //     const items: MenuProps["items"] = [
      //       {
      //         key: "1",
      //         label: (
      //           <span
      //             className="flex gap-2"
      //             // onClick={() => handleViewOrganisations(record)}
      //           >
      //             <EyeOutlined />
      //             View
      //           </span>
      //         ),
      //       },
      //     ];

      //     return (
      //       <Space>
      //         <Dropdown menu={{ items }} placement="bottomRight">
      //           <Button className=" dark:text-white">
      //             <div className="  text-lg font-semibold  items-center ">
      //               <EllipsisOutlined />
      //             </div>
      //           </Button>
      //         </Dropdown>
      //       </Space>
      //     );
      //   },
    },
  ];

  return (
    <div>
      <Table
        dataSource={apiResponse?.data || []}
        columns={mouOrganisationEmployees}
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
    </div>
  );
}
