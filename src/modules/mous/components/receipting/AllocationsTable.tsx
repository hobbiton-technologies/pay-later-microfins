import {
  MouAllocationsData,
  MouReceiptingData,
  useGetMouAllocationsStatsQuery,
} from "@/api/queries/mouQueries";
import { formatCurrency } from "@/utils/formaters";
import { createHandleTableChange } from "@/utils/HandleTableChange";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

type AllocationsProps = {
  receiptId: number;
};

export const AllocationsTable = ({ receiptId }: AllocationsProps) => {
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setPageNumber] = useState<number | null>(1);

  const { data: apiResponse } = useGetMouAllocationsStatsQuery({
    id: Number(localStorage.getItem("organizationId")),
    receiptId: receiptId,
    pageSize: pageSize ?? 10,
    pageNumber: pageNumber ?? 1,
  });

  const allocationsTable: ColumnsType<MouAllocationsData> = [
    {
      title: "Name",
      dataIndex: "organizationMember",
      render: (_, record: MouAllocationsData) =>
        record.organizationMember.user.firstName +
        " " +
        record.organizationMember.user.lastName,
    },
    {
      title: "Loan ID",
      render: (_) => receiptId,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_, record: MouAllocationsData) =>
        `${formatCurrency(record.amount)}`,
    },
    {
      title: "Position",
      dataIndex: "organizationMember",
      render: (_, record: MouAllocationsData) =>
        `${record.organizationMember.position}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record: MouAllocationsData) =>
        `${record.status ?? "Not Set"}`,
    },
  ];

  const handleTableChange = createHandleTableChange<MouAllocationsData>({
    setPageNumber,
    setPageSize,
  });

  return (
    <div>
      <Table
        columns={allocationsTable}
        dataSource={apiResponse?.data}
        onChange={handleTableChange}
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
