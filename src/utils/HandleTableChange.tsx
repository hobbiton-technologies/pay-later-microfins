import { TableProps } from "antd";

type HandleTableChangeParams<T> = {
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  setLoanStatus?: (status: string) => void;
  setFilteredLoanStatus?: (status: string | null) => void;
};

export function createHandleTableChange<T>(
  params: HandleTableChangeParams<T>
): TableProps<T>["onChange"] {
  const { setPageNumber, setPageSize, setLoanStatus, setFilteredLoanStatus } =
    params;

  return (pagination, filters) => {
    setPageNumber(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);

    if (setLoanStatus && setFilteredLoanStatus) {
      if (filters.loanStatus && filters.loanStatus.length > 0) {
        const status = filters.loanStatus[0] as string;
        setLoanStatus(status);
        setFilteredLoanStatus(status);
      } else {
        setLoanStatus("");
        setFilteredLoanStatus(null);
      }
    }
  };
}
