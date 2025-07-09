import {
  OrganisationData,
  useGetOrganisationsRequestQuery,
} from "@/api/queries/summaryQueries";
import Table, { ColumnsType } from "antd/es/table";
import DebouncedInputField from "../components/DebouncedInput";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
} from "antd";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import { customLoader } from "@/components/table-loader";
import { OrganisationForm } from "./components/OrganisationForm";
import { MicrofinOrgStaffTable } from "./components/MicrofinOrgStaffTable";
import { StaffMemberForm } from "./components/StaffMemberForm";

const Organisation = () => {
  const [id, setSearchId] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [isCreateStaffDrawerVisible, setIsCreateStaffDrawerVisible] =
    useState(false);

  const [selectedOrganisation, setSelectedOrganisation] =
    useState<OrganisationData>();
  const [isOrganisationDrawerVisible, setIsOrganisationDrawerVisible] =
    useState(false);

  const [organisations, setOrganisations] = useState<OrganisationData[]>([]);
  const { data: organisationData, isFetching } =
    useGetOrganisationsRequestQuery({
      id: Number(localStorage.getItem("organizationId")),
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    });

  useEffect(() => {
    if (organisationData?.data) {
      setOrganisations(organisationData.data);
    }
  }, [organisationData]);
  const handleTableChange = (pagination: any) => {
    setPageNumber(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearch = () => {
    setSearchId(id);
  };

  const handleSearchClear = () => {
    setSearchId("");
  };

  const handleViewOrganisations = (organisationId: number) => {
    if (organisationId && organisationData) {
      const organisation = organisations.find((a) => a.id === organisationId);
      setSelectedOrganisation(organisation);

      if (organisation) {
        setIsOrganisationDrawerVisible(true);
      }
      // console.log("selectedOrganisation", selectedOrganisation);
    }
  };

  const organisationsColumns = (
    handleViewOrganisations: (id: number) => void
  ): ColumnsType<OrganisationData> => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Org Phone No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Microfin Address",
      dataIndex: "address",
      key: "address",
      render: (_, record: OrganisationData) => record.microfin?.address || "-",
    },
    {
      title: "Microfin Email",
      dataIndex: "email",
      key: "email",
      render: (_, record: OrganisationData) => record.microfin?.email || "-",
    },
    {
      title: "Microfin Phone No",
      dataIndex: "email",
      key: "email",
      render: (_, record: OrganisationData) =>
        record.microfin?.contactNo || "-",
    },

    {
      title: "Actions",
      key: "actions",
      render: (record: OrganisationData) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <span
                className="flex gap-2"
                onClick={() => handleViewOrganisations(record?.id)}
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
                onClick={() => setIsCreateStaffDrawerVisible(true)}
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Create Staff Member
              </span>
            ),
          },
        ];

        return (
          <Space>
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button className=" dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className=" w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      {" "}
      <section className="w-full h-full py-3 flex   gap-2 ">
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for Product"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
        </div>
        <div className=" flex gap-3">
          {/* <Button onClick={exportCSV} className="bg-green-700 text-gray-100">
            <ExportOutlined className="text-white" />
            Export to CSV
          </Button> */}
          {/* <Select placeholder="Status" className="min-w-32" allowClear={true}>
            <Select.Option value={105}>Pending</Select.Option>
            <Select.Option value={109}>Failed</Select.Option>
            <Select.Option value={100}>Successful</Select.Option>
          </Select> */}
          <Button
            type="primary"
            onClick={() => setIsCreateDrawerVisible(true)}
            className=""
          >
            <ExportOutlined className="" />
            Add Organisation
          </Button>
        </div>
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          dataSource={organisationData?.data || []}
          columns={organisationsColumns(handleViewOrganisations)}
          rowKey="id"
          onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          pagination={{
            current: pageNumber ?? 1,
            pageSize: pageSize,
            total: organisationData?.totalItems,
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
        title="Create Organisation"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="55%"
      >
        <OrganisationForm />
      </Drawer>
      <Drawer
        title="Create Staff Member"
        open={isCreateStaffDrawerVisible}
        onClose={() => setIsCreateStaffDrawerVisible(false)}
        width="55%"
      >
        <StaffMemberForm />
      </Drawer>
      <Drawer
        width="85%"
        open={isOrganisationDrawerVisible}
        onClose={() => setIsOrganisationDrawerVisible(false)}
        closeIcon={true}
      >
        {selectedOrganisation ? (
          <div>
            <Card title="Organisation Details">
              <Descriptions bordered={true} column={3} className="text-black">
                <Descriptions.Item label="Organisation Id">
                  {selectedOrganisation.id}
                </Descriptions.Item>
                <Descriptions.Item label="Organisation Number">
                  {selectedOrganisation.contactNo}
                </Descriptions.Item>
                <Descriptions.Item label="Organisation Name">
                  {selectedOrganisation.name}
                </Descriptions.Item>
                <Descriptions.Item label="Org Microfin ID">
                  {selectedOrganisation.microfin.id}
                </Descriptions.Item>
                <Descriptions.Item label="Org Microfin Name">
                  {selectedOrganisation.microfin.name}
                </Descriptions.Item>
                <Descriptions.Item label="Org Microfin Address">
                  {selectedOrganisation.microfin.address}
                </Descriptions.Item>
                <Descriptions.Item label="Org Microfin Email">
                  {selectedOrganisation.microfin.email}
                </Descriptions.Item>
              </Descriptions>
              <div className=" pt-8">
                <MicrofinOrgStaffTable showCreateButton={true} />
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

export default Organisation;
