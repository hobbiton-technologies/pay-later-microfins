import { Api } from "../apiSlice";
import { MicrofinOrgStaffResponse } from "./summaryQueries";

interface MouLoansOrganisationRecoveryTransactionsData {
  id: number;
  transactionId: string;
  organizationMemberId: number;
  firstName: string;
  lastName: string;
  mouId: number;
  amount: number;
  transactionStatus: string;
  createdAt: string;
}

export interface MouOrganisationLoanTransactionData {
  id: number;
  memberId: number;
  mouId: number;
  amount: number;
  loanId: string;
  loanStatus: string;
  transactionId: string;
  lipilaBusinessCode: string;
  recipientMobileNumber: string;
  transactionMobileNumber: string;
  transactionType: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  member: {
    memberId: number;
    firstName: string;
    lastName: string;
    employeeId: string;
    position: string;
    email: string;
    phoneNumber: string;
  };
  mou: {
    mouId: number;
    organization: {
      id: number;
      name: string;
      contactNo: string;
      address: string;
      email: string;
      tPinNumber: string;
      sector: string;
      isDeactivated: boolean;
    };
    microfin: {
      id: number;
      name: string;
      contactNo: string;
      address: string;
      email: string;
      loanOperations: string[];
    };
  };
  transactionDate: string;
  maturityDate: string;
  initialInterestAmount: number;
  product: {
    id: number;
    name: string;
    loanProductType: string;
    maximumRepaymentPeriod: number;
    productStatus: string;
    gracePeriodInDays: number;
    interestRate: number;
    minimumLoanAmount: number;
    maximumLoanAmount: number;
    maximumLoanRate: number;
    insuranceRate: number;
    arrangementFeeRate: number;
    isCollateralBased: boolean;
  };
  recoveryTransactions: MouLoansOrganisationRecoveryTransactionsData[];
  amountPaid: number;
  balance: number;
}

export interface MouLoansOrganisationMembers {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isSystemAdmin: boolean;
  };
  idType: string;
  idNumber: string;
  employeeIdNumber: string;
  position: string;
  isOrganisationAdmin: boolean;
  isEnabled: boolean;
  maximumLoanAmountPerMonth: number;
}

export interface MouLoansOrganisationData {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  contactNo: string;
  address: string;
  email: string;
  tPinNumber: string;
  members: MouLoansOrganisationMembers[];
  sector: string;
  isDeactivated: boolean;
}

export interface MouLoansOrganisationResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: "string";
  data: MouLoansOrganisationData[];
  errors: ["string"];
}

export interface MouOrganisationLoanTransactionResponse {
  pageNumber: 0;
  pageSize: 0;
  totalItems: 0;
  statusCode: 0;
  message: "string";
  data: MouOrganisationLoanTransactionData[];
  errors: ["string"];
}

const OrganisationRequests = Api.injectEndpoints({
  endpoints: (builder) => ({
    getMouLoansOrganisations: builder.query<
      MouLoansOrganisationResponse,
      { id: number; query: string; pageSize: number; pageNumber: number }
    >({
      query: ({ id, query, pageSize, pageNumber }) => {
        const params = new URLSearchParams();

        // if (id) params.append("id", id.toString());
        if (query) params.append("Query", query.toString());
        if (pageSize) params.append("PageSize", pageSize.toString());
        if (pageNumber) params.append("PageNumber", pageNumber.toString());

        return `organizations?${params.toString()}`;
      },
    }),

    getMouOrganisationLoanTransactions: builder.query<
      MouOrganisationLoanTransactionResponse,
      {
        organisationId: number;
        mouOrganisationId: number;
        memberId: number;
        loanStatus: string;
        query: string;
        transactionType: string;
        status: string;
        startRange: string;
        endRange: string;
        isReportRequest: boolean;
        pageSize: number;
        pageNumber: number;
        id: number;
      }
    >({
      query: ({
        organisationId,
        mouOrganisationId,
        memberId,
        loanStatus,
        query,
        transactionType,
        status,
        startRange,
        endRange,
        isReportRequest,
        pageSize,
        pageNumber,
        id,
      }) => {
        const params = new URLSearchParams();

        if (memberId) params.append("MemberId", memberId.toString());
        if (loanStatus) params.append("LoanStatus", loanStatus);
        if (query) params.append("Query", query);
        if (transactionType) params.append("TransactionType", transactionType);
        if (status) params.append("Status", status);
        if (startRange) params.append("StartRange", startRange);
        if (endRange) params.append("EndRange", endRange);
        if (isReportRequest)
          params.append("IsReportRequest", String(isReportRequest));
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", pageNumber.toString());
        params.append("OrganizationId", mouOrganisationId.toString());
        if (id) params.append("id", id.toString());

        return `microfins/${organisationId}/transactions?${params.toString()}`;
      },
    }),

    getMouOrgStaffMembers: builder.query<
      MicrofinOrgStaffResponse,
      {
        id: number;
        organizationId?: number;
        query: string;
        pageNumber: number;
        pageSize: number;
      }
    >({
      query: ({ id, organizationId, query, pageNumber, pageSize }) => {
        const params = new URLSearchParams();

        // params.append("id", id.toString());
        if (query) params.append("query", query);
        if (organizationId !== undefined) {
          params.append("OrganizationId", organizationId.toString());
        }

        params.append("pageNumber", pageNumber.toString());
        params.append("pageSize", pageSize.toString());

        return `microfins/${id}/microfin-organizations/members?${params.toString()}`;
      },
      providesTags: ["MicrofinStaffMembers"],
    }),
  }),
});

export const {
  useGetMouLoansOrganisationsQuery,
  useGetMouOrganisationLoanTransactionsQuery,
  useGetMouOrgStaffMembersQuery,
} = OrganisationRequests;
