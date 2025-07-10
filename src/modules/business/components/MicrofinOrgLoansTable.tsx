import { MicrofinLoansData } from "@/api/queries/summaryQueries";
import { Button, Drawer, Dropdown, MenuProps, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ExportOutlined, EyeOutlined } from "@ant-design/icons";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { useState } from "react";
import { MicrofinOrgLoansForm } from "./MicrofinOrgLoansForm";

type MicrofinOrgLoansFormProps = {
  microfinOrganisationId: number;
};

export const loansColumns: ColumnsType<MicrofinLoansData> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Interest Amount",
    dataIndex: "interestRate",
    key: "interestRate",
  },
  {
    title: "Penalty Rate",
    dataIndex: "penaltyRate",
    key: "penaltyRate",
  },
  {
    title: "Penalty Calculation Method",
    dataIndex: "penaltyCalculationMethod",
    key: "penaltyCalculationMethod",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
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

export const MicrofinOrgLoansTable: React.FC<MicrofinOrgLoansFormProps> = ({
  microfinOrganisationId,
}) => {
  const [id, setSearchId] = useState<string>("");
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);

  const handleSearch = () => {
    setSearchId(id);
  };

  const handleSearchClear = () => {
    setSearchId(id);
  };
  return (
    <div>
      <section className="w-full h-full py-3 flex   gap-2 ">
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for Microfin Organisation loan"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
        </div>

        <div className="flex gap-3">
          <Button type="primary" onClick={() => setIsCreateDrawerVisible(true)}>
            <ExportOutlined />
            Create Loan
          </Button>
        </div>
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          // dataSource={staffResponse?.data || []}
          columns={loansColumns}
          rowKey="id"
          // onChange={handleTableChange}
          // loading={{
          //   spinning: isFetching,
          //   indicator: customLoader,
          // }}
          // pagination={{
          //   current: pageNumber ?? 1,
          //   pageSize: pageSize,
          //   total: staffResponse?.totalItems,
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
        title="Create Loan"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="40%"
      >
        <MicrofinOrgLoansForm />
      </Drawer>
    </div>
  );
};
