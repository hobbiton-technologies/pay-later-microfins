import { Api } from "../apiSlice";

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

export interface MouLoansOrganisationData {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  contactNo: string;
  address: string;
  email: string;
  tPinNumber: string;
  members: [
    {
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
  ];
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
        memberId: number;
        loanStatus: string;
        query: string;
        transactionType: string;
        status: string;
        startRange: string;
        endRange: string;
        isReportRequest: boolean;
        pageSize: string;
        pageNumber: string;
        id: string;
      }
    >({
      query: ({
        organisationId,
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

        if (organisationId) params.append("id", organisationId.toString());
        if (memberId) params.append("MemberId", memberId.toString());
        if (loanStatus) params.append("LoanStatus", loanStatus);
        if (query) params.append("Query", query);
        if (transactionType) params.append("TransactionType", transactionType);
        if (status) params.append("Status", status);
        if (startRange) params.append("StartRange", startRange);
        if (endRange) params.append("EndRange", endRange);
        if (isReportRequest)
          params.append("IsReportRequest", String(isReportRequest));
        params.append("PageSize", pageSize);
        params.append("PageNumber", pageNumber);
        if (id) params.append("id", id);

        return `microfins/${organisationId}/transactions?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMouLoansOrganisationsQuery } = OrganisationRequests;
