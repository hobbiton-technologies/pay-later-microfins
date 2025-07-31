import Table, { ColumnsType } from "antd/es/table";

export const AllocationsTable = () => {
  const allocationsTable: ColumnsType = [
    {
      title: "Name",
    },
    {
      title: "Loan ID",
    },
    {
      title: "Amount",
    },
    {
      title: "Position",
    },
    {
      title: "Status",
    },
  ];
  return (
    <div>
      <Table
        columns={allocationsTable}
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
    </div>
  );
};
