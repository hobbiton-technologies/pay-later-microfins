import {
  OrganisationData,
  useGetOrganisationsRequestQuery,
} from "@/api/queries/summaryQueries";
import { MenuProps, Space, Dropdown, Button, Card, Drawer } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { OrganisationForm } from "@/modules/business/components/Organisation/OrganisationForm";
import { customLoader } from "@/components/table-loader";
import { MicrofinOrgStaffMemberForm } from "@/modules/business/components/MicrofinOrg/StaffMembers/MIcrofinOrgStaffMemberForm";
import { MicrofinOrgLoansTable } from "@/modules/business/components/MicrofinOrgLoansTable";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import {
  MouLoansOrganisationData,
  useGetMouLoansOrganisationsQuery,
} from "@/api/queries/organisationQueries";

export const MouOrganisationTable = () => {
  const [id, setSearchId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [isCreateStaffDrawerVisible, setIsCreateStaffDrawerVisible] =
    useState(false);
  const navigate = useNavigate();

  const [selectedOrganisation, setSelectedOrganisation] =
    useState<MouLoansOrganisationData>();

  const [isOrganisationDrawerVisible, setIsOrganisationDrawerVisible] =
    useState(false);

  const [isLoansDrawerVisible, setIsLoansDrawerVisible] = useState(false);

  const [organisations, setOrganisations] = useState<
    MouLoansOrganisationData[]
  >([]);
  const { data: organisationData, isFetching } =
    useGetMouLoansOrganisationsQuery({
      id: Number(localStorage.getItem("organizationId")),
      query: searchQuery,
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    });

  useEffect(() => {
    if (organisationData?.data) {
      setOrganisations(organisationData.data);
    }
  }, [organisationData]);

  useEffect(() => {
    if (selectedOrganisation) {
      setIsLoansDrawerVisible(true);
    }
  }, [selectedOrganisation]);

  const handleTableChange = (pagination: any) => {
    setPageNumber(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
  };

  const handleSearchClear = () => {
    setSearchQuery(searchQuery);
  };

  const handleViewOrganisations = (organisationId: number) => {
    if (organisationId && organisationData) {
      const organisation = organisations.find((a) => a.id === organisationId);
      setSelectedOrganisation(organisation);

      if (organisation) {
        setIsOrganisationDrawerVisible(true);
      }
      // console.log("selectedOrganisation", selectedOrganisation?.id);
    }
  };

  const handleViewMicrofinOrgLoans = (organisationId: number) => {
    if (organisationId && organisationData) {
      const organisation = organisations.find((a) => a.id === organisationId);
      setSelectedOrganisation(organisation);

      if (organisation) {
        setIsLoansDrawerVisible(true);
      }
    }
  };

  const organisationsColumns = (
    handleViewOrganisations: (record: MouLoansOrganisationData) => void
    // handleViewMicrofinOrgLoans: (id: number) => void
  ): ColumnsType<MouLoansOrganisationData> => [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: " Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record: MouLoansOrganisationData) =>
        record.address || "Not Set",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record: MouLoansOrganisationData) =>
        record.email || "Not Set",
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
                onClick={() => handleViewOrganisations(record)}
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

  return (
    <div>
      {" "}
      <section className="w-full h-full py-3 flex   gap-2 ">
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for Organisation"
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
          columns={organisationsColumns((record: MouLoansOrganisationData) =>
            navigate(`/microfin-org-details`, {
              state: {
                member: {
                  ...record,
                },
              },
            })
          )}
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
        title="Create Microfin Organisation Staff Member"
        open={isCreateStaffDrawerVisible}
        onClose={() => setIsCreateStaffDrawerVisible(false)}
        width="50%"
      >
        {selectedOrganisation?.id && (
          <MicrofinOrgStaffMemberForm
            microfinOrganisationId={selectedOrganisation?.id}
          />
        )}
      </Drawer>
      {/* <Drawer
            width="85%"
            open={isOrganisationDrawerVisible}
            onClose={() => setIsOrganisationDrawerVisible(false)}
            closeIcon={true}
          >
            {selectedOrganisation ? (
              <div>
                <Card title={`${selectedOrganisation.name} `}>
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
                    <MicrofinOrgStaffTable
                      showCreateButton={true}
                      microfinOrganisationId={selectedOrganisation?.id}
                      microfinMemberId={selectedOrganisation?.microfin?.id}
                    />
                  </div>
                </Card>
              </div>
            ) : (
              "Invalid process"
            )}
          </Drawer> */}
      <Drawer
        width="83%"
        open={isLoansDrawerVisible}
        onClose={() => setIsLoansDrawerVisible(false)}
        closeIcon={true}
      >
        {selectedOrganisation ? (
          <div>
            <Card title={`${selectedOrganisation.name} Loans`}>
              <div className=" pt-8">
                {/* FIX: Check if microfin exists and has valid ID before rendering */}
                {selectedOrganisation.id ? (
                  <MicrofinOrgLoansTable
                    showCreateButton={false}
                    microfinOrganisationId={selectedOrganisation.id} // Use organisation ID, not microfin ID
                    microfinMemberId={selectedOrganisation.id}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No microfin data available for this organisation
                  </div>
                )}
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
