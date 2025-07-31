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
      <Table columns={allocationsTable} />
    </div>
  );
};
