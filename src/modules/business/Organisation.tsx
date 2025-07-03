import { OrganisationData } from "@/api/queries/summaryQueries";
import Table, { ColumnsType } from "antd/es/table";
import DebouncedInputField from "../components/DebouncedInput";
import { useState } from "react";
import { Button, Select } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { customLoader } from "@/components/table-loader";

export const organisationsColumns: ColumnsType<OrganisationData> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Contact No",
    dataIndex: "contactNo",
    key: "contactNo",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Organization Identifier",
    dataIndex: "organizationIdentifier",
    key: "organizationIdentifier",
  },
  {
    title: "TPin Number",
    dataIndex: "tPinNumber",
    key: "tPinNumber",
  },
  {
    title: "Actions",
    key: "actions",
  },
];

const Organisation = () => {
  const [id, setSearchId] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);

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
          <Button type="primary" className="">
            <ExportOutlined className="" />
            Add Organisation
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

export default Organisation;
