import {
  BranchesData,
  useGetMicrofinBranchesRequestQuery,
} from "@/api/queries/summaryQueries";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { Button, Drawer, Dropdown, MenuProps, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import { customLoader } from "@/components/table-loader";
import { ColumnsType } from "antd/es/table";
import { BranchesForm } from "./BranchesForm";

export const branchesColumns: ColumnsType<BranchesData> = [
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
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Microfin",
    dataIndex: "microfin",
    render: (_, record: BranchesData) => record.microfin?.name || "-",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Branch ID",
    dataIndex: "branchId",
    key: "branchId",
  },
  {
    title: "Actions",
    key: "actions",
    render: () => {
      const items: MenuProps["items"] = [
        {
          key: "4",
          label: (
            <span className="flex gap-2" onClick={() => alert("View CLicked")}>
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

export const BranchesTable = () => {
  const [id, setSearchId] = useState<string>("");
  //   const [, setMicrofinBranches] = useState<BranchesData[]>();
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: microfinBranches, isFetching } =
    useGetMicrofinBranchesRequestQuery({
      id: Number(localStorage.getItem("organizationId")),
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    });
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);

  //   useEffect(() => {
  //     if (microfinBranches) {
  //       setMicrofinBranches(microfinBranches?.data ?? []);
  //     }
  //   }, [microfinBranches]);

  const handleTableChange = (pagination: any) => {
    setPageNumber(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearch = () => {
    setSearchId(id);
  };

  const handleSearchClear = () => {
    setSearchId(id);
  };

  return (
    <div className=" mt-2">
      <p className=" font-semibold">Organisation Branches</p>
      <section className="w-full h-full py-3 flex   gap-2 ">
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for Branch"
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
            Add Branch
          </Button>
        </div>
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          dataSource={microfinBranches?.data || []}
          columns={branchesColumns}
          rowKey="id"
          onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          pagination={{
            current: pageNumber ?? 1,
            pageSize: pageSize,
            total: microfinBranches?.totalItems,
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
        title="Create Branch"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="55%"
      >
        <BranchesForm />
      </Drawer>
    </div>
  );
};
