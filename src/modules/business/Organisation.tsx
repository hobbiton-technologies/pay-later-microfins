import {
  OrganisationData,
  useGetOrganisationsRequestQuery,
} from "@/api/queries/summaryQueries";
import Table, { ColumnsType } from "antd/es/table";
import DebouncedInputField from "../components/DebouncedInput";
import { useState } from "react";
import { Button, Drawer, Select } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { customLoader } from "@/components/table-loader";
import { OrganisationForm } from "./components/OrganisationForm";

export const organisationsColumns: ColumnsType<OrganisationData> = [
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
    render: (_, record: OrganisationData) => record.microfin?.contactNo || "-",
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
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);

  const { data: organisationData, isFetching } =
    useGetOrganisationsRequestQuery({
      id: Number(localStorage.getItem("organizationId")),
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    });

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
          columns={organisationsColumns}
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
        title="Create Loan Product"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="55%"
      >
        <OrganisationForm />
      </Drawer>
    </div>
  );
};

export default Organisation;
