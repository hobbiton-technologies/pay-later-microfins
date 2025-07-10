import { Table } from "antd";

type MicrofinOrgLoansFormProps = {
  microfinOrganisationId: number;
};

export const MicrofinOrgLoansTable: React.FC<MicrofinOrgLoansFormProps> = ({
  microfinOrganisationId,
}) => {
  return (
    <div>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          // dataSource={staffResponse?.data || []}
          // columns={branchesColumns}
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
    </div>
  );
};
