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
  Form,
  Input,
  MenuProps,
  message,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { formatCurrency } from "@/utils/formaters";
import { TimerIcon } from "lucide-react";
import {
  ProductsData,
  useGetLoanProductRequestQuery,
} from "@/api/queries/summaryQueries";
import {
  TenureBody,
  useCreateTenureMutation,
} from "@/api/mutations/tenureMutation";

export const MassMarketClientsTable = () => {
  const [id, setSearchId] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchProductQuery, setSearchProductQuery] = useState<string>("");

  const [massMarketClient, setMassMarketClient] = useState<
    MassMarketClientData[]
  >([]);

  const [form] = Form.useForm();

  const [clients, setClients] = useState<MassMarketClientData[]>([]);
  const [selectedClients, setSelectedClients] =
    useState<MassMarketClientData>();

  const [selectedMassMarketClient, setSelectedMassMarketClient] =
    useState<MassMarketClientData | null>(null);

  const [isClientDrawerVisible, setIsClientDrawerVisible] = useState(false);
  const [isMassMarketClientDrawerVisible, setIsMassMarketClientDrawerVisible] =
    useState(false);

  const [submitTenureData, { isLoading }] = useCreateTenureMutation();
  const { data: productsResponse, isFetching: productIsFetching } =
    useGetLoanProductRequestQuery({
      id: id,
      searchQuery: searchProductQuery,
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    });

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

  const clientColumns = (
    handleAddTenure: (record: MassMarketClientData) => void
  ): ColumnsType<MassMarketClientData> => [
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
          {
            key: "3",
            label: (
              <span
                className="flex gap-2 text-blue-500"
                onClick={() => handleAddTenure(record)}
              >
                <div className=" w-4">
                  {" "}
                  <TimerIcon className=" w-4" />
                </div>
                Add Tenure
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

  const handleAddTenure = (record: MassMarketClientData) => {
    setSelectedMassMarketClient(record);
    setIsMassMarketClientDrawerVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      const organizationId = Number(localStorage.getItem("organizationId"));

      const tenureData: TenureBody = {
        period: values.period || "",
        interestRate: values.interestRate || "",
        loanProductId: values.loanProductId || "",
      };
      await submitTenureData({
        organizationId,
        tenureData,
        clientId: selectedMassMarketClient?.id,
      });
      message.success("Successfully added Tenure");
      form.resetFields();
    } catch (error) {
      console.error("Failed to add Tenure ", error);
    }
  };

  return (
    <div>
      <section className="w-full h-full hidden md:flex md:flex-col gap-4">
        <div>
          <AnimatedHeader title="Mass Market Clients" />
          <p className="text-slate-500 text-xs">Manage your clients</p>
        </div>
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for Staff Member"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
        </div>
        <Table
          dataSource={apiResponse?.data || []}
          columns={clientColumns(handleAddTenure)}
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
              {selectedMassMarketClient.tenures.map((tenure, index) => (
                <Descriptions
                  key={tenure.id}
                  bordered={true}
                  column={2}
                  className=" text-slate-800"
                  title={`Tenure ${index + 1}`}
                >
                  <Descriptions.Item label="Period">
                    {tenure.period}
                  </Descriptions.Item>
                  <Descriptions.Item label="Interest Rate">
                    {tenure.interestRate}%
                  </Descriptions.Item>
                  <Descriptions.Item label="Loan Product">
                    {tenure.loanProductName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Created At">
                    {new Date(tenure.createdAt).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>
              ))}
            </div>
          </Card>
        ) : (
          "Invalid"
        )}
      </Drawer>

      <Modal
        centered
        open={isMassMarketClientDrawerVisible}
        onCancel={() => setIsMassMarketClientDrawerVisible(false)}
        confirmLoading={isLoading}
        onOk={() => {
          form.submit();
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className=" grid grid-cols-2 gap-4">
            <Form.Item
              name="loanProductId"
              label="Loan Product"
              rules={[
                { required: true, message: "Please select a Loan Product" },
              ]}
            >
              <Select
                showSearch
                placeholder="Search Loan Product"
                onSearch={(value) => setSearchProductQuery(value)}
                filterOption={false}
                loading={productIsFetching}
                allowClear
              >
                {productsResponse?.data?.map((member: ProductsData) => (
                  <Select.Option key={member.id} value={member.id}>
                    {member.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item required={true} name="period" label="Period">
              <Input placeholder="enter period" />
            </Form.Item>
            <Form.Item
              required={true}
              name="interestRate"
              label="Interest Rate"
            >
              <Input placeholder="enter interest rate" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
