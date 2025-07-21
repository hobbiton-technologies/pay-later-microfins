import {
  ProductsData,
  useGetLoanProductRequestQuery,
} from "@/api/queries/summaryQueries";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
  Tag,
} from "antd";
import Table, { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import { NewProductForm } from "./NewProductForm";

export const ProductsTable = () => {
  const [id, setSearchId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [pageAmount, setPageAmount] = useState<number>(0);
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [selectedLoanProduct, setSelectedLoanProduct] =
    useState<ProductsData | null>(null);
  const [filteredLoanProductStatus, setFilteredLoanProductStatus] = useState<
    string | null
  >(null);
  const [filteredLoanProductType, setFilteredLoanProductType] = useState<
    string | null
  >(null);
  const [filteredInterestType, setFilteredInterestType] = useState<
    string | null
  >(null);
  const [isLoanProductsDrawerVisible, setIsLoanProductsDrawerVisible] =
    useState(false);

  // const [loanProducts, setLoanProducts] = useState<ProductsData[]>([]);

  const {
    data: productsResponse,
    isFetching,
    refetch,
  } = useGetLoanProductRequestQuery({
    id: Number(localStorage.getItem("organizationId")),
    Query: searchQuery,
    pageNumber: pageNumber ?? 1,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (productsResponse) {
      setProducts(productsResponse?.data || []);
      setTotalData(productsResponse?.totalItems || 0);
      setPageAmount(productsResponse?.pageSize || 0);
    }
  }, [productsResponse]);

  useEffect(() => {
    refetch();
  }, [searchQuery, pageSize, pageAmount]);

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
  };

  const handleSearchClear = () => {
    setSearchId(0);
  };

  const productsColumns = (
    handleViewLoanProduct: (record: ProductsData) => void
  ): ColumnsType<ProductsData> => [
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
      title: "Type",
      dataIndex: "loanProductType",
      key: "loanProductType",
      filters: [
        { text: "Emergency Advance", value: "EmergencyAdvance" },
        { text: "Short Term Loan", value: "ShortTermLoan" },
        { text: "Long Term Loan", value: "LongTermLoan " },
      ],
      filteredValue: filteredLoanProductType ? [filteredLoanProductType] : null,
      onFilter: (value, record) => record.productStatus === value,
      render: (productStatus: string) => {
        const statusColors: Record<string, string> = {
          ShortTermLoan: "blue",
          EmergencyAdvance: "green",
          LongTermLoan: "orange",
        };

        const displayName: Record<string, string> = {
          EmergencyAdvance: "Emergency Advance",
          ShortTermLoan: "Short Term Loan",
          LongTermLoan: "Long Term Loan",
        };

        const color = statusColors[productStatus] || "default";
        const label = displayName[productStatus] || productStatus;

        return (
          <Tag color={color} style={{ fontWeight: 500 }}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Max Payment Period",
      dataIndex: "maximumRepaymentPeriod",
      key: "maximumRepaymentPeriod",
    },
    {
      title: "Min Amount",
      dataIndex: "minimumLoanAmount",
      key: "minimumLoanAmount",
    },
    {
      title: "Max Amount",
      dataIndex: "maximumLoanAmount",
      key: "maximumLoanAmount",
    },
    {
      title: "Status",
      dataIndex: "productStatus",
      key: "productStatus",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "InActive" },
      ],
      filteredValue: filteredLoanProductStatus
        ? [filteredLoanProductStatus]
        : null,
      onFilter: (value, record) => record.productStatus === value,
      render: (productStatus: string) => {
        const statusColors: Record<string, string> = {
          Active: "blue",
          InActive: "red",
        };

        const displayName: Record<string, string> = {
          Active: "Active",
          InActive: "Inactive",
        };

        const color = statusColors[productStatus] || "default";
        const label = displayName[productStatus] || productStatus;

        return (
          <Tag color={color} style={{ fontWeight: 500 }}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Interest Type",
      dataIndex: "interestType",
      key: "interestType",
      filters: [
        { text: "Flat Rate", value: "FlatRate" },
        { text: "Reducing Balance ", value: "ReducingBalance " },
      ],
      filteredValue: filteredInterestType ? [filteredInterestType] : null,
      onFilter: (value, record) => record.interestType === value,
      render: (interestType: string) => {
        const statusColors: Record<string, string> = {
          FlatRate: "blue",
          ReducingBalance: "green",
        };

        const displayName: Record<string, string> = {
          FlatRate: "Flat Rate",
          ReducingBalance: "Reducing Balance",
        };

        const color = statusColors[interestType] || "default";
        const label = displayName[interestType] || interestType;

        return (
          <Tag color={color} style={{ fontWeight: 500 }}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Min Interest Rate",
      dataIndex: "minimumInterestRate",
      key: "minimumInterestRate",
      render: (_, record: ProductsData) => `${record.minimumInterestRate}%`,
    },
    {
      title: "Max Interest Rate",
      dataIndex: "maximumInterestRate",
      key: "maximumInterestRate",
      render: (_, record: ProductsData) => `${record.maximumInterestRate}%`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: ProductsData) => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                onClick={() => handleViewLoanProduct(record)}
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
              <Button className="dark:border-gray-800  dark:text-white">
                <EyeOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const handleViewLoanProduct = (record: ProductsData) => {
    setSelectedLoanProduct(record);
    setIsLoanProductsDrawerVisible(true);
  };

  const handleTableChange: TableProps<ProductsData>["onChange"] = (
    pagination,
    filters
  ) => {
    setPageNumber(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);

    if (filters.productStatus && filters.productStatus.length > 0) {
      const status = filters.productStatus[0] as string;
      setFilteredLoanProductStatus(status);
    } else {
      setFilteredLoanProductStatus(null);
    }

    if (filters.loanProductType && filters.loanProductType.length > 0) {
      const loanType = filters.loanProductType[0] as string;
      setFilteredLoanProductType(loanType);
    } else {
      setFilteredLoanProductType(null);
    }

    if (filters.interestType && filters.interestType.length > 0) {
      const interestType = filters.interestType[0] as string;
      setFilteredInterestType(interestType);
    } else {
      setFilteredInterestType(null);
    }
  };

  return (
    <div className="">
      {" "}
      <section className="w-full h-full py-3 flex gap-2 ">
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
            Add Product
          </Button>
        </div>
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          dataSource={productsResponse?.data || []}
          columns={productsColumns(handleViewLoanProduct)}
          rowKey="id"
          onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          pagination={{
            current: pageNumber ?? 1,
            pageSize: pageSize,
            total: totalData,
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
        title="Create Loan Product"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="55%"
      >
        <NewProductForm />
      </Drawer>
      {selectedLoanProduct && (
        <Drawer
          title={`${selectedLoanProduct.name}`}
          open={isLoanProductsDrawerVisible}
          onClose={() => {
            setIsLoanProductsDrawerVisible(false);
            setSelectedLoanProduct(null);
          }}
          width="55%"
        >
          {selectedLoanProduct ? (
            <div>
              <Card className=" grid grid-cols-1 gap-4">
                <div>
                  <p className=" font-semibold pb-2">Loan Details</p>
                  <Descriptions bordered={true} column={2}>
                    <Descriptions.Item label="Minimum Loan Amount">
                      {selectedLoanProduct.minimumLoanAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Maximum Loan Amount">
                      {selectedLoanProduct.maximumLoanAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Distribution Channels">
                      {selectedLoanProduct.distributionChannels}
                    </Descriptions.Item>
                    <Descriptions.Item label="Product Status">
                      {selectedLoanProduct.productStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="Collateral Based">
                      {selectedLoanProduct.isCollateralBased ? "Yes" : "No"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Disbursement Methods">
                      {selectedLoanProduct.loanDisbursementTypes}
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div className=" pt-4">
                  <p className=" font-semibold pb-2">Interests</p>
                  <Descriptions bordered={true} column={2}>
                    <Descriptions.Item label="Interest Calculation Type">
                      {selectedLoanProduct.calculateInterestByRate
                        ? "Rate"
                        : "Fixed Amount"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Interest Type">
                      {selectedLoanProduct.interestType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Minimum Interest Rate">
                      {selectedLoanProduct.minimumInterestRate}%
                    </Descriptions.Item>
                    <Descriptions.Item label="Maximum Interest Rate">
                      {selectedLoanProduct.maximumInterestRate}%
                    </Descriptions.Item>
                    <Descriptions.Item label="Minimum Interest Amount">
                      K{selectedLoanProduct.minimumInterestAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Maximum Interest Amount">
                      K{selectedLoanProduct.maximumInterestAmount}
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div className=" pt-4">
                  <p className=" font-semibold pb-2">Repayments</p>
                  <Descriptions bordered={true} column={2}>
                    <Descriptions.Item label="Minimum Repayment Period">
                      {selectedLoanProduct.minimumRepaymentPeriod} days
                    </Descriptions.Item>
                    <Descriptions.Item label="Maximum Repayment Period">
                      {selectedLoanProduct.maximumRepaymentPeriod} days
                    </Descriptions.Item>
                    <Descriptions.Item label="Repayment Cycles">
                      {selectedLoanProduct.repaymentCycles}
                    </Descriptions.Item>
                    <Descriptions.Item label="Grace Period">
                      {selectedLoanProduct.gracePeriodInDays} days
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div className=" pt-4">
                  <p className=" font-semibold pb-2">Penalties</p>
                  <Descriptions bordered={true} column={2}>
                    <Descriptions.Item label="Penalty Calculations Enabled">
                      {selectedLoanProduct.calculatePenalty ? "Yes" : "No"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Calculate Penalty By Rate">
                      {selectedLoanProduct.calculatePenaltyByRate
                        ? "Yes"
                        : "No"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Penalty Rate">
                      {selectedLoanProduct.penaltyRate}%
                    </Descriptions.Item>
                    <Descriptions.Item label="Penalty Amount">
                      K{selectedLoanProduct.penaltyAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Penalty Calculation Method">
                      {selectedLoanProduct.penaltyCalculationMethod}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Card>
            </div>
          ) : (
            "Invalid process"
          )}
        </Drawer>
      )}
    </div>
  );
};
