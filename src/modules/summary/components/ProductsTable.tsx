import {
  ProductsData,
  useGetGovernmentBondsRequestQuery,
} from "@/api/queries/summaryQueries";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { Button, message } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { ExportOutlined } from "@ant-design/icons";

export const productsColumns: ColumnsType<ProductsData> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "Type",
    dataIndex: "bidType",
    key: "bidType",
  },
  {
    title: "Payment Period",
    dataIndex: "tenor",
    key: "tenor",
  },
  {
    title: "Min Amount",
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "Max Amount",
    dataIndex: "bidType",
    key: "bidType",
  },
  {
    title: "Status",
    dataIndex: "tenor",
    key: "tenor",
  },
  {
    title: "Arranged Rate",
    dataIndex: "bidType",
    key: "bidType",
  },
  {
    title: "Interest Rate",
    dataIndex: "tenor",
    key: "tenor",
  },
];

export const ProductsTable = () => {
  const [id, setSearchId] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [pageAmount, setPageAmount] = useState<number>(0);

  const {
    data: productsResponse,
    isFetching,
    refetch,
  } = useGetGovernmentBondsRequestQuery({
    id: id,
    searchQuery: "",
    pageNumber: pageNumber ?? 1,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (productsResponse) {
      setProducts(productsResponse?.data || []);
    }
  }, [productsResponse]);

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
  return (
    <div className=" mt-2">
      {" "}
      <section className="w-full h-full py-3 flex   gap-2 mt-20">
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
          <Button
            onClick={() => message.success("Button clicked")}
            className="bg-blue-700 text-gray-100"
          >
            <ExportOutlined className=" text-gray-200" />
            Create Government Bond
          </Button>
        </div>
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          dataSource={productsResponse?.data || []}
          columns={productsColumns}
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
    </div>
  );
};
