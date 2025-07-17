import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Dropdown,
  Form,
  Input,
  MenuProps,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import {
  ExportOutlined,
  EyeOutlined,
  StopOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { useEffect, useState } from "react";
import {
  GetMicrofinLoansData,
  useGetMicrofinLoansQuery,
} from "@/api/queries/loansQueries";
import { customLoader } from "@/components/table-loader";
import { formatCurrency } from "@/utils/formaters";
import { Check } from "lucide-react";
import {
  useApproveMicrofinOrgLoanMutation,
  useDisburseMicrofinOrgLoanMutation,
} from "@/api/mutations/loansMutation";
import { Option } from "antd/es/mentions";
import { MainMicrofinOrgLoansForm } from "./MainMicrofinOrgLoansForm";

type MicrofinOrgLoansTableProps = {
  showCreateButton?: boolean;
  microfinOrganisationId: number;
  microfinMemberId: number;
};

export const MainMicrofinOrgLoansTable: React.FC<
  MicrofinOrgLoansTableProps
> = ({ showCreateButton = true, microfinOrganisationId, microfinMemberId }) => {
  const [id, setSearchId] = useState<string>("");
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loanStatus, setloanStatus] = useState<string>("");
  const [startDate, setstartDate] = useState<string>("");
  const [endDate, setendDate] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();

  const [isLoanApproveDrawerVisible, setIsLoanApproveDrawerVisible] =
    useState(false);
  const [isLoanDisburseDrawerVisible, setIsLoanDisburseDrawerVisible] =
    useState(false);

  const [isLoansDrawerVisible, setIsLoansDrawerVisible] = useState(false);
  const [loans, setLoans] = useState<GetMicrofinLoansData[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<GetMicrofinLoansData>();
  const [filteredLoanStatus, setFilteredLoanStatus] = useState<string | null>(
    null
  );

  const loansColumns = (
    handleViewMicrofinOrgLoans: (record: GetMicrofinLoansData) => void,
    handleApproveMicrofinOrgLoan: (record: GetMicrofinLoansData) => void,
    handleDisburseLoan: (record: GetMicrofinLoansData) => void
  ): ColumnsType<GetMicrofinLoansData> => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Member Name",
      render: (_, record: GetMicrofinLoansData) =>
        `${record.member.user.firstName}  ${record.member.user.lastName}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <div className=" font-semibold">{formatCurrency(amount)}</div>
      ),
    },
    {
      title: "Rate",
      dataIndex: "interestRate",
      key: "interestRate",
      render: (_, record: GetMicrofinLoansData) => `${record.interestRate}%`,
    },
    {
      title: "Total Amount",
      dataIndex: "interestRate",
      key: "interestRate",
      render: (_, record: GetMicrofinLoansData) =>
        ` ${formatCurrency(
          record.amount + (record.interestRate / 100) * record.amount
        )}`,
    },
    {
      title: "Status",
      dataIndex: "loanStatus",
      key: "loanStatus",
      filters: [
        { text: "Under Review", value: "UnderReview" },
        { text: "Approved", value: "Approved" },
        { text: "Rejected", value: "Rejected" },
        { text: "Disbursed", value: "Disbursed" },
        { text: "Partially Settled", value: "PartiallySettled" },
        { text: "Fully Settled", value: "FullySettled" },
        { text: "Overdue", value: "Overdue" },
        { text: "Defaulted", value: "Defaulted" },
      ],
      filteredValue: filteredLoanStatus ? [filteredLoanStatus] : null,
      onFilter: (value, record) => record.loanStatus === value,
      render: (loanStatus: string) => {
        const statusColors: Record<string, string> = {
          UnderReview: "orange",
          Rejected: "red",
          Approved: "blue",
          DisbursementInitiated: "purple",
          Disbursed: "green",
          PartiallySettled: "gold",
          FullySettled: "cyan",
          Overdue: "volcano",
          Defaulted: "magenta",
        };

        const displayName: Record<string, string> = {
          UnderReview: "Under Review",
          Rejected: "Rejected",
          Approved: "Approved",
          DisbursementInitiated: "Disbursement Initiated",
          Disbursed: "Disbursed",
          PartiallySettled: "Partially Settled",
          FullySettled: "Fully Settled",
          Overdue: "Overdue",
          Defaulted: "Defaulted",
        };

        const color = statusColors[loanStatus] || "default";
        const label = displayName[loanStatus] || loanStatus;

        return (
          <Tag color={color} style={{ fontWeight: 500 }}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_, record: GetMicrofinLoansData) => `${record.duration} days`,
    },
    {
      title: "Maturity Date",
      dataIndex: "maturityDate",
      key: "maturityDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: GetMicrofinLoansData) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <span
                className="flex gap-2 text-slate-500"
                onClick={() => handleViewMicrofinOrgLoans(record)}
              >
                <EyeOutlined />
                View
              </span>
            ),
          },
          ...(record.loanStatus.toLowerCase() === "approved"
            ? [
                {
                  key: "2",
                  label: (
                    <span
                      className="flex gap-2 text-green-500"
                      onClick={() => handleDisburseLoan(record)}
                    >
                      <UpSquareOutlined />
                      Disburse
                    </span>
                  ),
                },
              ]
            : record.loanStatus.toLowerCase() === "underreview"
            ? [
                {
                  key: "3",
                  label: (
                    <span
                      className="flex gap-2 text-blue-500"
                      onClick={() => handleApproveMicrofinOrgLoan(record)}
                    >
                      <div className=" w-4">
                        {" "}
                        <Check className=" w-4" />
                      </div>
                      Approve <span className=" text-slate-500">|</span>
                      <span className="flex gap-2 text-red-500">
                        <StopOutlined />
                        Reject
                      </span>
                    </span>
                  ),
                },
              ]
            : []),
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

  const handleTableChange: TableProps<GetMicrofinLoansData>["onChange"] = (
    pagination,
    filters
  ) => {
    setPageNumber(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);

    if (filters.loanStatus && filters.loanStatus.length > 0) {
      setloanStatus(filters.loanStatus[0] as string);
      setFilteredLoanStatus(filters.loanStatus[0] as string);
    } else {
      setloanStatus("");
      setFilteredLoanStatus(null);
    }
  };
  const handleSearch = () => {
    setSearchId(id);
    setSearchQuery(searchQuery);
  };

  const handleSearchClear = () => {
    setSearchId(id);
  };

  const [disburseLoan, { isLoading: disbursementIsLoading }] =
    useDisburseMicrofinOrgLoanMutation();
  const [approveLoan, { isLoading }] = useApproveMicrofinOrgLoanMutation();

  const { data: apiResponse, isFetching } = useGetMicrofinLoansQuery({
    id: Number(localStorage.getItem("organizationId")),
    memberid: microfinMemberId,
    microfinOrganisationId: microfinOrganisationId,
    query: searchQuery,
    loanStatus: loanStatus,
    startDate: startDate,
    endDate: endDate,
    pageNumber: pageNumber ?? 1,
    pageSize: pageSize,
  });

  console.log(microfinOrganisationId);

  const handleViewMicrofinOrgLoans = (record: GetMicrofinLoansData) => {
    if (record) {
      const loan = loans.find((a) => a.id === record.id);
      setSelectedLoan(loan);

      if (loan) {
        setIsLoansDrawerVisible(true);
      }
    }
  };

  const handleApproveMicrofinOrgLoan = (record: GetMicrofinLoansData) => {
    if (record) {
      const loan = loans.find((a) => a.id === record.id);
      setSelectedLoan(loan);
      if (loan) {
        setIsLoanApproveDrawerVisible(true);
      }
    }
  };

  const handleDisburseLoan = (record: GetMicrofinLoansData) => {
    if (record) {
      const loan = loans.find((a) => a.id === record.id);
      setSelectedLoan(loan);
      if (loan) {
        setIsLoanDisburseDrawerVisible(true);
      }
    }
  };

  // const handleSubmitLoan = (record: MicrofinOrgStaffMembersData) => {
  //   if (record) {
  //     const members = selectedMember.find(
  //       (a) => a.id === record.organization.id
  //     );
  //     setSelectedMember(members);
  //     // if (members) {
  //     //   setIsLoanDisburseDrawerVisible(true);
  //     // }
  //   }
  // };

  useEffect(() => {
    if (apiResponse?.data) {
      setLoans(apiResponse.data);
    }
  }, [apiResponse]);

  const statusColors: Record<string, string> = {
    UnderReview: "orange",
    Rejected: "red",
    Approved: "blue",
    DisbursementInitiated: "purple",
    Disbursed: "green",
    PartiallySettled: "gold",
    FullySettled: "cyan",
    Overdue: "volcano",
    Defaulted: "magenta",
  };

  const color = statusColors[selectedLoan?.loanStatus || ""] || "default";

  const handleLoanApproveSubmit = async (values: {
    answer: string;
    comment: string;
  }) => {
    try {
      const approveLoanData = {
        answer: values.answer,
        comment: values.comment,
      };
      await approveLoan({
        organizationId: Number(localStorage.getItem("organizationId")),
        microfinOrganisationId: selectedLoan?.member.organization.id,
        loanId: selectedLoan?.id,
        approveLoanData,
      }).unwrap();
      message.success("Loan response submitted successfully");
      setIsLoanApproveDrawerVisible(false);
      console.log(microfinOrganisationId);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div>
      <section className="w-full h-full  flex   gap-2 ">
        <div className="w-full">
          <DebouncedInputField
            placeholder="Search for Microfin Organisation loan"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
        </div>

        {showCreateButton && (
          <div className="flex gap-3">
            <Button
              type="primary"
              onClick={() => setIsCreateDrawerVisible(true)}
            >
              <ExportOutlined />
              Create Loan
            </Button>
          </div>
        )}
      </section>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <Table
          onChange={handleTableChange}
          dataSource={apiResponse?.data || []}
          columns={loansColumns(
            handleViewMicrofinOrgLoans,
            handleApproveMicrofinOrgLoan,
            handleDisburseLoan
          )}
          rowKey="id"
          // onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          pagination={{
            current: pageNumber ?? 1,
            pageSize: pageSize,
            total: apiResponse?.totalItems,
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
        title="Create Loan"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="40%"
      >
        <MainMicrofinOrgLoansForm
          microfinOrganisationId={microfinOrganisationId}
          microfinMemberId={microfinMemberId}
        />
      </Drawer>
      <Drawer
        width="60%"
        open={isLoansDrawerVisible}
        onClose={() => setIsLoansDrawerVisible(false)}
        closeIcon={true}
      >
        {selectedLoan ? (
          <div>
            <Card
              title={`${selectedLoan.member.user.firstName} ${selectedLoan.member.user.lastName}`}
            >
              <div className="">
                <p className=" pb-2 font-medium">Loan Details</p>
                <Descriptions
                  bordered={true}
                  column={2}
                  className=" text-slate-800"
                >
                  <Descriptions.Item label="Loan amount">
                    ZMW{" "}
                    {selectedLoan.amount
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Interest Rate">
                    {selectedLoan.interestRate}%
                  </Descriptions.Item>
                  <Descriptions.Item label="Full Amount">
                    ZMW{" "}
                    {selectedLoan.fullLoanAmount
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Duration">
                    {selectedLoan.duration} days
                  </Descriptions.Item>
                  <Descriptions.Item label="Loan Status">
                    <Tag color={color}> {selectedLoan.loanStatus}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Penalty Calculation ">
                    {selectedLoan.penaltyCalculationMethod}
                  </Descriptions.Item>

                  <Descriptions.Item label="Maturity Date">
                    {new Date(selectedLoan.maturityDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </Descriptions.Item>

                  <Descriptions.Item label="Start Date">
                    {new Date(selectedLoan.startDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Comment">
                    {selectedLoan.comment}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="Resolved By">
                    {selectedLoan?.resolvedBy?.user
                      ? `${selectedLoan.resolvedBy.user.firstName} (${selectedLoan.resolvedBy.user.email})`
                      : "NA"}
                  </Descriptions.Item> */}
                  {/* <Descriptions.Item label="UploadedBy">
                    {selectedLoan?.uploadedBy.user
                      ? `${selectedLoan.uploadedBy.user.firstName} (${selectedLoan.uploadedBy.user.email})`
                      : "NA"}
                  </Descriptions.Item> */}
                  {/* <Descriptions.Item label="UploadedBy Phone">
                    {selectedLoan?.uploadedBy.user
                      ? `${selectedLoan.uploadedBy.user.phoneNumber}`
                      : "NA"}
                  </Descriptions.Item> */}
                </Descriptions>
              </div>
              <div className=" py-4">
                <p className=" pb-2 font-medium">Personal Details</p>
                <Descriptions
                  bordered={true}
                  column={2}
                  className=" text-slate-800"
                >
                  <Descriptions.Item label="Email">
                    {selectedLoan.member.user.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number">
                    {selectedLoan.member.user.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="ID Type">
                    {selectedLoan.member.idType}
                  </Descriptions.Item>
                  <Descriptions.Item label="ID Number">
                    {selectedLoan.member.idNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Position">
                    {selectedLoan.member.position}
                  </Descriptions.Item>
                  <Descriptions.Item label="Activated">
                    {selectedLoan.member.activated}
                  </Descriptions.Item>
                  <Descriptions.Item label="Bank Name">
                    {selectedLoan?.member.bankDetails.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Bank Branch">
                    {selectedLoan.member.bankDetails?.branch ?? "NA"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Bank Code">
                    {selectedLoan.member.bankDetails?.code}
                  </Descriptions.Item>
                  <Descriptions.Item label="Account No">
                    {selectedLoan.member.bankDetails?.accountNumber}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <div className=" pb-4 ">
                <p className=" pb-2 font-semibold">Organization Details</p>
                <Descriptions
                  bordered={true}
                  column={2}
                  className=" text-slate-800"
                >
                  <Descriptions.Item label="Microfin Org">
                    {selectedLoan.member.organization.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    +260 {selectedLoan.member.organization.contactNo}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              {/* <div className=" pt-8">
                <MicrofinOrgLoansTable
                  showCreateButton={false}
                  microfinOrganisationId={selectedLoan?.id}
                  microfinMemberId={selectedLoan.member.id}
                />
              </div> */}
            </Card>
          </div>
        ) : (
          "Invalid process"
        )}
      </Drawer>
      <Modal
        centered
        open={isLoanApproveDrawerVisible}
        onCancel={() => setIsLoanApproveDrawerVisible(false)}
        confirmLoading={isLoading}
        onOk={() => {
          form.submit();
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleLoanApproveSubmit}>
          <div className=" text-center py-6">
            {" "}
            You're about to <span className=" italic">approve</span> a{" "}
            <span className=" font-semibold">
              {selectedLoan?.duration} day(s)
            </span>{" "}
            loan application of amount{" "}
            <div className=" text-lg font-semibold">
              ZMW{" "}
              {selectedLoan?.amount
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>{" "}
            at an interest rate of{" "}
            <span className=" font-semibold">
              {selectedLoan?.interestRate}%
            </span>{" "}
            for{" "}
            <span className=" font-semibold">
              {selectedLoan?.member.user.firstName}{" "}
              {selectedLoan?.member.user.lastName}
            </span>
          </div>
          <div className=" grid grid-cols-2 gap-4">
            <Form.Item required={true} name="comment" label="Comment">
              <Input placeholder="enter comment" />
            </Form.Item>
            <Form.Item required={true} name="answer" label="Select">
              <Select placeholder="Select">
                <Option value="Accept">Approve</Option>
                <Option value="Reject">Reject</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        centered
        open={isLoanDisburseDrawerVisible}
        onCancel={() => setIsLoanDisburseDrawerVisible(false)}
        confirmLoading={disbursementIsLoading}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async () => {
            await disburseLoan({
              organizationId: Number(localStorage.getItem("organizationId")),
              microfinOrganisationId: selectedLoan?.member.organization.id,
              loanId: selectedLoan?.id,
            });
            setIsLoanDisburseDrawerVisible(false);
          }}
        >
          <div className=" text-center py-6">
            {" "}
            You're about to <span className=" italic">disburse</span> a{" "}
            <span className=" font-semibold">
              {selectedLoan?.duration} day(s)
            </span>{" "}
            loan application of amount{" "}
            <div className=" text-lg font-semibold">
              ZMW{" "}
              {selectedLoan?.amount
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>{" "}
            at an interest rate of{" "}
            <span className=" font-semibold">
              {selectedLoan?.interestRate}%
            </span>{" "}
            to{" "}
            <span className=" font-semibold">
              {selectedLoan?.member.user.firstName}{" "}
              {selectedLoan?.member.user.lastName}
            </span>
          </div>
          {/* your loan confirmation text */}
          <div className=" grid grid-cols-2 gap-4"></div>
        </Form>
      </Modal>
    </div>
  );
};
