import {
  BranchesData,
  useGetMicrofinBranchesRequestQuery,
} from "@/api/queries/summaryQueries";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { ExportOutlined } from "@ant-design/icons";

export const BranchesTable = () => {
  const [id, setSearchId] = useState<string>("");

  const [, setMicrofinBranches] = useState<BranchesData>();
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: microfinBranches, isFetching } =
    useGetMicrofinBranchesRequestQuery({
      id: Number(localStorage.getItem("organizationId")),
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    });

  useEffect(() => {
    if (microfinBranches) {
      setMicrofinBranches(microfinBranches?.data || []);
    }
  }, [microfinBranches]);

  //   const handleTableChange = (pagination: any) => {
  //     setPageNumber(pagination.current);
  //     setPageSize(pagination.pageSize);
  //   };

  const handleSearch = () => {
    setSearchId(id);
  };

  const handleSearchClear = () => {
    setSearchId("");
  };

  return (
    <div className=" mt-2">
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
          <Button type="primary" className="">
            <ExportOutlined className="" />
            Add Branch
          </Button>
        </div>
      </section>
    </div>
  );
};
