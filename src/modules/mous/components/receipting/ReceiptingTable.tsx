import Table, { ColumnsType } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MenuProps, Space, Dropdown, Button } from "antd";

export const ReceiptingTable = () => {
  const ReceiptingColumns: ColumnsType = [
    {
      title: "Receipt ID",
    },
    {
      title: "Organization Name",
    },
    {
      title: "Added By",
    },
    {
      title: "Initial Amount (ZMW)",
    },
    {
      title: "Balance (ZMW)",
    },
    {
      title: "Status",
    },
    {
      title: "Created At",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => {
        const items: MenuProps["items"] = [
          {
            key: "4",
            label: (
              <span
                className="flex gap-2"
                onClick={() => alert("View CLicked")}
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
                <div className="  text-lg font-semibold items-center pb-2">
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
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          //   dataSource={microfinBranches?.data || []}
          columns={ReceiptingColumns}
          rowKey="id"
          //   onChange={handleTableChange}
          //   loading={{
          //     spinning: isFetching,
          //     indicator: customLoader,
          //   }}
          //   pagination={{
          //     current: pageNumber ?? 1,
          //     pageSize: pageSize,
          //     total: microfinBranches?.totalItems,
          //   }}
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
