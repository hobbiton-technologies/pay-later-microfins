import {
  Button,
  DatePicker,
  Drawer,
  Dropdown,
  MenuProps,
  Space,
  Tag,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import {
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  MouProductsData,
  useGetMouProductsQuery,
} from "@/api/queries/mouQueries";
import { useEffect, useState } from "react";
import { customLoader } from "@/components/table-loader";
import DebouncedInputField from "@/modules/components/DebouncedInput";
import { MouProposalForm } from "./MouProposalForm";
import { createHandleTableChange } from "@/utils/HandleTableChange";
import moment from "moment";
import Papa from "papaparse";
import { saveAs } from "file-saver";

export const MouTable = () => {
  const [id, setId] = useState<number>(0);
  const [microfinId, setMicrofinId] = useState<number>(0);
  const [organizationId, setOrganizationId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [pageSize, setPageSize] = useState<number | null>(10);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [, setSearchQuery] = useState<string>("");
  const [searchInput] = useState<string>("");
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const [Proposals, setProposals] = useState<MouProductsData[]>([]);
  const { RangePicker } = DatePicker;

  const { data: apiResponse, isFetching } = useGetMouProductsQuery({
    id: id,
    microfinId: microfinId,
    organizationId: organizationId,
    startdate: dateRange ? dateRange[0].toISOString() : "",
    endDate: dateRange ? dateRange[1].toISOString() : "",
    pageSize: pageSize ?? 10,
    pageNumber: pageNumber ?? 1,
  });

  useEffect(() => {
    setProposals(apiResponse?.data || []);
  });

  const MouColumns: ColumnsType<MouProductsData> = [
    {
      title: "Organisation Name",
      dataIndex: "organization",
      key: "organization",
      render: (_, record: MouProductsData) => record.organization.name,
    },
    {
      title: "Email",
      dataIndex: "organization",
      key: "organization",
      render: (_, record: MouProductsData) => record.organization.email,
    },
    {
      title: "Address",
      dataIndex: "organization",
      key: "organization",
      render: (_, record: MouProductsData) => record.organization.address,
    },
    {
      title: "Proposed By",
      dataIndex: "proposedBy",
      key: "organization",
      render: (_, record: MouProductsData) =>
        `${record.proposedBy.user.firstName} ${record.proposedBy.user.lastName}`,
    },
    {
      title: "Status",
      dataIndex: "mouStatus",
      key: "mouStatus",
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          Accepted: "blue",
          Pending: "orange",
          Rejected: "red",
        };

        const displayName: Record<string, string> = {
          Accepted: "Accepted",
          Pending: "Pending",
          Rejected: "Rejected",
        };

        const color = statusColors[status] || "default";
        const label = displayName[status] || status;

        return (
          <Tag color={color} style={{ fontWeight: 500 }}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
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
                <div className="  text-lg font-semibold items-center">
                  <EllipsisOutlined />
                </div>
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const handleTableChange = createHandleTableChange<MouProductsData>({
    setPageNumber,
    setPageSize,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
  };

  const handleSearchClear = () => {
    setSearchQuery(searchInput);
  };

  const exportCSV = () => {
    if (Proposals && apiResponse?.data) {
      const currentDate = new Date().toISOString().split("T")[0];

      const modifiedCsv = Proposals.map((item) => {
        const baseRow: any = {
          Id: item?.id ?? "",
          ProposalStatus: item?.mouStatus ?? "",
          ProposalStartDate: item?.startDate ?? "",
          ProposalEndDate: item?.endDate ?? "",
          ProposalDate: item?.createdAt ?? "",
          MoiFileId: item?.mouFileId ?? "",
          MicrofinId: item?.microfin?.id ?? "",
          MicrofinName: item?.microfin?.name ?? "",
          MicrofinContactNo: item?.microfin?.contactNo ?? "",
          MicrofinAddress: item?.microfin?.address ?? "",
          MicrofinEmail: item?.microfin?.email ?? "",
          OrganisationId: item?.organization?.id ?? "",
          OrganisationName: item?.organization?.name ?? "",
          OrganisationContactNo: item?.organization?.contactNo ?? "",
          OrganisationAddress: item?.organization?.address ?? "",
          OrganisationEmail: item?.organization?.email ?? "",
          OrganisationTpin: item?.organization?.tPinNumber ?? "",
          OrganisationSector: item?.organization?.sector ?? "",
          OrganisationIsDeactived: item?.organization?.isDeactivated
            ? "Yes"
            : "No",
          ProposedById: item?.proposedBy?.id ?? "",
          ProposedByName: `${item?.proposedBy?.user?.firstName ?? ""} ${
            item?.proposedBy?.user?.lastName ?? ""
          }`,
          ProposedByEmail: item?.proposedBy?.user?.email ?? "",
          ProposedByPhone: item?.proposedBy?.user?.phoneNumber ?? "",
          ProposedByIdType: item?.proposedBy?.idType ?? "",
          ProposedByIdNumber: item?.proposedBy?.idNumber ?? "",
          ProposedByBranch: item?.proposedBy?.branch ?? "",
          ProposedByPosition: item?.proposedBy?.position ?? "",
        };

        // Add Loan Products
        item?.loanProducts?.forEach((lp, index) => {
          const i = index + 1;
          baseRow[`LoanProductId #${i}`] = lp?.id ?? "";
          baseRow[`LoanProductName #${i}`] = lp?.name ?? "";
          baseRow[`LoanProductType #${i}`] = lp?.loanProductType ?? "";
          baseRow[`MaxRepaymentPeriod #${i}`] =
            lp?.maximumRepaymentPeriod ?? "";
          baseRow[`ProductStatus #${i}`] = lp?.productStatus ?? "";
          baseRow[`GracePeriodInDays #${i}`] = lp?.gracePeriodInDays ?? "";
          baseRow[`InterestRate #${i}`] = lp?.interestRate ?? "";
          baseRow[`MinLoanAmount #${i}`] = lp?.minimumLoanAmount ?? "";
          baseRow[`MaxLoanAmount #${i}`] = lp?.maximumLoanAmount ?? "";
          baseRow[`MaxLoanRate #${i}`] = lp?.maximumLoanRate ?? "";
          baseRow[`InsuranceRate #${i}`] = lp?.insuranceRate ?? "";
          baseRow[`ArrangementFeeRate #${i}`] = lp?.arrangementFeeRate ?? "";
          baseRow[`IsCollateralBased #${i}`] = lp?.isCollateralBased
            ? "Yes"
            : "No";
        });

        // Add Responders
        item?.responders?.forEach((r, index) => {
          const i = index + 1;
          const user = r?.responder?.user;
          const responder = r?.responder;

          baseRow[`ResponderName #${i}`] = `${user?.firstName ?? ""} ${
            user?.lastName ?? ""
          }`;
          baseRow[`ResponderEmail #${i}`] = user?.email ?? "";
          baseRow[`ResponderPhone #${i}`] = user?.phoneNumber ?? "";
          baseRow[`ResponderEmployeeId #${i}`] =
            responder?.employeeIdNumber ?? "";
          baseRow[`ResponderPosition #${i}`] = responder?.position ?? "";
          baseRow[`ResponderIdType #${i}`] = responder?.idType ?? "";
          baseRow[`ResponderIdNumber #${i}`] = responder?.idNumber ?? "";
          baseRow[`ResponderIsOrgDeactivated #${i}`] =
            responder?.isOrganizationDeactivated ? "Yes" : "No";
        });

        return baseRow;
      });

      const csvMod = Papa.unparse(modifiedCsv);
      const blob = new Blob([csvMod], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `Proposals_Report_${currentDate}.csv`);
    }
  };

  return (
    <div>
      <section className="w-full h-full hidden md:flex md:flex-col">
        <div className="w-full flex gap-2">
          <DebouncedInputField
            placeholder="Search for proposal"
            onSearch={handleSearch}
            onClear={handleSearchClear}
            allowClear={true}
          />
          <RangePicker
            className="min-w-52"
            onChange={(dates) => {
              setDateRange(dates as [moment.Moment, moment.Moment]);
            }}
          />
          <Button onClick={exportCSV} className=" text-slate-500">
            <ExportOutlined className=" text-slate-500" />
            Export
          </Button>
          <div className="">
            <Button
              type="primary"
              onClick={() => setIsCreateDrawerVisible(true)}
              className=""
            >
              <ExportOutlined className="" />
              Propose MOU
            </Button>
          </div>
        </div>
        <Table
          dataSource={apiResponse?.data || []}
          columns={MouColumns}
          rowKey="id"
          onChange={handleTableChange}
          loading={{
            spinning: isFetching,
            indicator: customLoader,
          }}
          pagination={{
            current: pageNumber ?? 1,
            pageSize: pageSize ?? 10,
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
        title="Propose MOU"
        open={isCreateDrawerVisible}
        onClose={() => setIsCreateDrawerVisible(false)}
        width="45%"
      >
        <MouProposalForm />
      </Drawer>
    </div>
  );
};
