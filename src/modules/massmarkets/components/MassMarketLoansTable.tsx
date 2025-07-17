import {
  MassMarketClientData,
  useGetMassMarketClientsQuery,
} from "@/api/queries/massMarketQueries";
import AnimatedHeader from "@/modules/components/AnimatedHeader";
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { formatCurrency } from "@/utils/formaters";

export const MassMarketLoansTable = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [massMarketClient, setMassMarketClient] = useState<
    MassMarketClientData[]
  >([]);

  const [selectedMassMarketClient, setSelectedMassMarketClient] =
    useState<MassMarketClientData | null>(null);

  const [isClientDrawerVisible, setIsClientDrawerVisible] = useState(false);

  const { data: apiResponse, isFetching } = useGetMassMarketClientsQuery({
    id: Number(localStorage.getItem("organizationId")),
    pageNumber: pageNumber ?? 1,
    pageSize: pageSize,
    query: searchQuery,
  });

  useEffect(() => {
    if (apiResponse) {
      setMassMarketClient(apiResponse?.data || []);
    }
  }, [apiResponse]);

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  const handleSearchClear = () => {
    setSearchQuery(searchQuery);
  };

  const loanColumns: ColumnsType<MassMarketClientData> = [
    {
      title: "Fullname",
      dataIndex: "name",
      key: "name",
      render: (_, record: MassMarketClientData) =>
        `${record.user.firstName} ${record.user.lastName}`,
    },
    {
      title: "Microfin Name",
      dataIndex: "name",
      key: "name",
      render: (_, record: MassMarketClientData) => `${record.microfin.name} `,
    },
    {
      title: "ID Number",
      dataIndex: "idNumber",
      key: "idNumber",
    },
    {
      title: "Loan Limit",
      dataIndex: "loanLimit",
      key: "loanLimit",
      render: (_, record: MassMarketClientData) =>
        formatCurrency(record.loanLimit),
    },
    {
      title: "Enabled",
      dataIndex: "isEnabled",
      key: "isEnabled",
      render: (_, record: MassMarketClientData) =>
        record?.isEnabled ? "Yes" : "No",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: MassMarketClientData) => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                onClick={() => {
                  setSelectedMassMarketClient(record);
                  setIsClientDrawerVisible(true);
                }}
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
    <div>
      <section className="w-full h-full hidden md:flex md:flex-col gap-4">
        <div>
          <AnimatedHeader title="Mass Market Loans" />
          <p className="text-slate-500 text-xs">Manage your loans</p>
        </div>
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for loan"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
        </div>
        <Table
          dataSource={apiResponse?.data || []}
          columns={loanColumns}
          rowKey="id"
          // onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          // pagination={{
          //   current: pageNumber ?? 1,
          //   pageSize: pageSize,
          //   total: microfinBranches?.totalItems,
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
        title="Client Details"
        width="50%"
        open={isClientDrawerVisible}
        onClose={() => setIsClientDrawerVisible(false)}
        closeIcon={true}
      >
        {selectedMassMarketClient ? (
          <Card>
            <div className=" pb-4">
              <p className=" font-semibold pb-2">Personal Details</p>
              <Descriptions
                bordered={true}
                column={2}
                className=" text-slate-800"
              >
                <Descriptions.Item label=" First Name">
                  {selectedMassMarketClient.user.firstName}
                </Descriptions.Item>
                <Descriptions.Item label=" Last Name">
                  {selectedMassMarketClient.user.lastName}
                </Descriptions.Item>
                <Descriptions.Item label=" Email">
                  {selectedMassMarketClient.user.email ?? "Not set"}
                </Descriptions.Item>
                <Descriptions.Item label=" Phone number">
                  {selectedMassMarketClient.user.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label="ID Type">
                  {selectedMassMarketClient.idType}
                </Descriptions.Item>
                <Descriptions.Item label="ID Number">
                  {selectedMassMarketClient.idNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Loan Limit">
                  {formatCurrency(selectedMassMarketClient.loanLimit)}
                </Descriptions.Item>
                <Descriptions.Item label="Enabled">
                  {selectedMassMarketClient.isEnabled ? "Yes" : "No"}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className=" pb-4">
              <p className=" font-semibold pb-2">Microfin Details</p>
              <Descriptions
                bordered={true}
                column={2}
                className=" text-slate-800"
              >
                <Descriptions.Item label=" Microfin Name">
                  {selectedMassMarketClient.microfin.name}
                </Descriptions.Item>
                <Descriptions.Item label=" Microfin Number">
                  {selectedMassMarketClient.microfin.contactNo}
                </Descriptions.Item>
                <Descriptions.Item label=" Email">
                  {selectedMassMarketClient.microfin.email ?? "Not set"}
                </Descriptions.Item>
                <Descriptions.Item label=" Address">
                  {selectedMassMarketClient.microfin.address}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className=" pb-4">
              <p className=" font-semibold pb-2">Tenures</p>
              <Descriptions
                bordered={true}
                column={2}
                className=" text-slate-800"
              >
                {/* <Descriptions.Item label=" Period">
                  {selectedMassMarketClient.id}
                </Descriptions.Item>
                <Descriptions.Item label=" Microfin Number">
                  {selectedMassMarketClient.microfin.contactNo}
                </Descriptions.Item>
                <Descriptions.Item label=" Email">
                  {selectedMassMarketClient.microfin.email ?? "Not set"}
                </Descriptions.Item>
                <Descriptions.Item label=" Address">
                  {selectedMassMarketClient.microfin.address}
                </Descriptions.Item> */}
              </Descriptions>
            </div>
          </Card>
        ) : (
          "Invalid"
        )}
      </Drawer>
    </div>
  );
};
