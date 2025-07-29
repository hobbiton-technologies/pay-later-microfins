import { Button, Drawer, Dropdown, MenuProps, Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  MouProductsData,
  useGetMouProductsQuery,
} from "@/api/queries/mouQueries";
import { useState } from "react";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { MouProposalForm } from "./MouProposalForm";
import { createHandleTableChange } from "@/utils/HandleTableChange";

export const MouTable = () => {
  const [id, setId] = useState<number>(0);
  const [microfinId, setMicrofinId] = useState<number>(0);
  const [organizationId, setOrganizationId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [, setSearchQuery] = useState<string>("");
  const [searchInput] = useState<string>("");
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);

  const { data: apiResponse, isFetching } = useGetMouProductsQuery({
    id: id,
    microfinId: microfinId,
    organizationId: organizationId,
    startdate: startDate,
    endDate: endDate,
    pageSize: pageSize ?? 10,
    pageNumber: pageNumber ?? 1,
  });

  const MouColumns: ColumnsType<MouProductsData> = [
    {
      title: "Organisation Name",
      dataIndex: "organization",
      key: "organization",
      render: (_, record: MouProductsData) => record.organization.name,
    },
    {
      title: "Email",
      dataIndex: "organization",
      key: "organization",
      render: (_, record: MouProductsData) => record.organization.email,
    },
    {
      title: "Address",
      dataIndex: "organization",
      key: "organization",
      render: (_, record: MouProductsData) => record.organization.address,
    },
    {
      title: "Proposed By",
      dataIndex: "proposedBy",
      key: "organization",
      render: (_, record: MouProductsData) =>
        `${record.proposedBy.user.firstName} ${record.proposedBy.user.lastName}`,
    },
    {
      title: "Status",
      dataIndex: "mouStatus",
      key: "mouStatus",
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          Accepted: "blue",
          Pending: "orange",
          Rejected: "red",
        };

        const displayName: Record<string, string> = {
          Accepted: "Accepted",
          Pending: "Pending",
          Rejected: "Rejected",
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
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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

  const handleTableChange = createHandleTableChange<MouProductsData>({
    setPageNumber,
    setPageSize,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
  };

  const handleSearchClear = () => {
    setSearchQuery(searchInput);
  };

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
          <div className="">
            <Button
              type="primary"
              onClick={() => setIsCreateDrawerVisible(true)}
              className=""
            >
              <ExportOutlined className="" />
              Propose MOU
            </Button>
          </div>
        </div>
        <Table
          dataSource={apiResponse?.data || []}
          columns={MouColumns}
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
        title="Propose MOU"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="45%"
      >
        <MouProposalForm />
      </Drawer>
    </div>
  );
};
