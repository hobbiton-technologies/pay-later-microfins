import { Api } from "../apiSlice";

export interface FinanceStatsData {
  totalDisbursementAmount: number;
  totalRepaymentAmount: number;
  totalInterestAmount: number;
  totalOverdueAmount: number;
  totalLoansDisbursed: number;
  totalMous: number;
}

export interface OverviewStatsData {
  dailyAmount: number;
  monthlyAmount: number;
  annualAmount: number;
  activeLoansAmount: number;
  pendingLoansAmount: number;
  failedLoansAmount: number;
  fullySettledAmount: number;
  fromInceptionAmount: number;
  interestAmount: number;
  activeLoans: number;
  pendingLoans: number;
  failedLoans: number;
  repayedLoans: number;
  fromInception: number;
}

export interface OrganisationStatsData {
  all: number;
  withMou: number;
  withoutMou: number;
}

export interface LoanStats {
  month: number;
  monthlyStats: {
    loansTotal: number;
    repaymentsTotal: number;
  };
}

export interface MicrofinLoansData {
  id: number;
  amount: number;
  interestRate: number;
  penaltyRate: number;
  penaltyCalculationMethod: string;
  documents: [
    {
      name: string;
      document: string;
    }
  ];
  startDate: string;
  duration: number;
}

export interface MicrofinStaffMembersData {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isSystemAdmin: true;
  };
  idType: string;
  idNumber: string;
  branch: string;
  position: string;
  isMicrofinAdmin: true;
  isEnabled: true;
  employeeIdNumber: string;
}

export interface MicrofinOrgStaffMembersData {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  organization: {
    id: number;
    name: string;
    contactNo: string;
  };
  idType: string;
  idNumber: string;
  position: string;
  activated: boolean;
  createdAt: string;
  bankDetails: {
    id: number;
    name: string;
    branch: string;
    code: string;
    accountNumber: string;
  };
}

export interface OrganisationData {
  id: number;
  name: string;
  contactNo: string;
  microfin: {
    id: number;
    name: string;
    contactNo: string;
    address: string;
    email: string;
  };
  createdAt: string;
}

export interface BranchesData {
  id: number;
  createdAt: string;
  updatedAt: string;
  microfin: {
    id: number;
    name: string;
    contactNo: string;
    address: string;
    email: string;
  };
  name: string;
  address: string;
  phoneNumber: string;
  branchId: string;
}

export interface ProductsData {
  id: number;
  microfinId: number;
  microfinName: string;
  name: string;
  loanProductType: string;
  minimumLoanAmount: number;
  maximumLoanAmount: number;
  distributionChannels: string[];
  loanDisbursementTypes: string[];
  minimumRepaymentPeriod: number;
  maximumRepaymentPeriod: number;
  gracePeriodInDays: number;
  repaymentCycles: string[];
  calculateInterestByRate: true;
  minimumInterestRate: number;
  maximumInterestRate: number;
  minimumInterestAmount: number;
  maximumInterestAmount: number;
  interestType: string;
  calculatePenalty: true;
  calculatePenaltyByRate: true;
  penaltyRate: number;
  penaltyAmount: number;
  penaltyCalculationMethod: string;
  loanProductCharges: [
    {
      id: number;
      name: string;
      calculateByRate: true;
      amount: number;
      rate: number;
      createdAt: string;
    }
  ];
  productStatus: string;
  isCollateralBased: true;
  loanDocuments: [
    {
      id: number;
      name: string;
      isRequired: true;
      createdAt: string;
    }
  ];
  isMouBased: true;
  microfinBranches: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      microfin: {
        id: number;
        name: string;
        contactNo: string;
        address: string;
        email: string;
      };
      name: string;
      address: string;
      phoneNumber: string;
      branchId: string;
    }
  ];
}

export interface OrganisationResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: OrganisationData[];
  errors: string[];
}

export interface ProductsDataResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: ProductsData[];
  errors: string[];
}

export interface BranchesResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: BranchesData[];
  errors: string[];
}

export interface MicrofinOrgStaffResponse {
  pageNumber: 1;
  pageSize: 1;
  totalItems: 1;
  statusCode: 200;
  message: "Ok";
  data: MicrofinOrgStaffMembersData[];
  errors: null;
}

export interface MicrofinStaffResponse {
  pageNumber: 1;
  pageSize: 1;
  totalItems: 1;
  statusCode: 200;
  message: "Ok";
  data: MicrofinStaffMembersData[];
  errors: null;
}

export interface LoanStatsResponse {
  statusCode: number;
  message: string;
  data: LoanStats[];
  errors: string[];
}

export interface OrganisationStatsResponse {
  statusCode: number;
  message: string;
  data: OrganisationStatsData;
  errors: string[];
}

export interface OverviewStatsResponse {
  statusCode: 200;
  message: "Ok";
  data: OverviewStatsData;
  errors: [];
}

export interface FinanceStatsResponse {
  statusCode: number;
  message: string;
  data: FinanceStatsData;
  errors: string[];
}

export const SummaryRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    getSummaryData: builder.query<any, any>({
      query: ({}) => {
        return ``;
      },
    }),
    getLoanProductRequest: builder.query<
      ProductsDataResponse,
      {
        id?: number;
        Query?: string;
        ProductStatus?: string;
        pageNumber: number;
        pageSize: number;
      }
    >({
      query: ({ id, Query, ProductStatus, pageNumber, pageSize }) => {
        const params = new URLSearchParams();

        if (id) params.append("id", id.toString());
        if (Query) params.append("Query", Query);
        if (ProductStatus)
          params.append("ProductStatus", ProductStatus.toString());
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", pageNumber.toString());

        return `/microfins/${id}/products?${params.toString()}`;
      },
      providesTags: ["LoanProducsts"],
    }),

    getMicrofinBranchesRequest: builder.query<
      BranchesResponse,
      { id: number; pageNumber: number; pageSize: number }
    >({
      query: ({ id, pageNumber, pageSize }) => {
        const params = new URLSearchParams();
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", pageNumber.toString());
        return `/microfins/${id}/branches?${params.toString()}`;
      },
      providesTags: ["Branches"],
    }),

    getOrganisationsRequest: builder.query<
      OrganisationResponse,
      { id: number; Query?: string; pageNumber: number; pageSize: number }
    >({
      query: ({ id, Query, pageNumber, pageSize }) => {
        const params = new URLSearchParams();

        if (Query) params.append("Query", Query.toString());
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", pageNumber.toString());
        return `/microfins/${id}/microfin-organizations?${params.toString()}`;
      },
      providesTags: ["MicrofinOrganisations"],
    }),

    getMicrofinOrgStaffMembers: builder.query<
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

    getMicrofinStaffMembers: builder.query<
      MicrofinStaffResponse,
      {
        id: number;
        organizationId: number;
        Query: string;
        pageNumber: number;
        pageSize: number;
      }
    >({
      query: ({ id, organizationId, Query, pageNumber, pageSize }) => {
        const params = new URLSearchParams();

        if (id) params.append("id", id.toString());
        if (Query) params.append("Query", Query);
        // params.append("organizationId", organizationId.toString());
        params.append("pageNumber", pageNumber.toString());
        params.append("pageSize", pageSize.toString());

        return `microfins/${organizationId}/microfin-organizations/members?${params.toString()}`;
      },
      providesTags: ["MicrofinOrgStaffMembers"],
    }),

    getLoanStats: builder.query<LoanStatsResponse, { organizationId: number }>({
      query: ({ organizationId }) => {
        const params = new URLSearchParams();
        if (organizationId) params.append("id", organizationId.toString());

        return `microfins/${organizationId}/stats/monthly?${params.toString()}`;
      },
    }),

    getOrganisationStats: builder.query<
      OrganisationStatsResponse,
      { organizationId: number }
    >({
      query: ({ organizationId }) => {
        const params = new URLSearchParams();
        if (organizationId) params.append("id", organizationId.toString());

        return `microfins/${organizationId}/stats/organizations?${params.toString()}`;
      },
    }),

    getOverviewStats: builder.query<
      OverviewStatsResponse,
      { organizationId: number }
    >({
      query: ({ organizationId }) => {
        const params = new URLSearchParams();
        if (organizationId) params.append("id", organizationId.toString());

        return `microfins/${organizationId}/stats/overview?${params.toString()}`;
      },
    }),

    getfinanceStats: builder.query<
      FinanceStatsResponse,
      { organizationId: number }
    >({
      query: ({ organizationId }) => {
        const params = new URLSearchParams();
        if (organizationId) params.append("id", organizationId.toString());

        return `microfins/${organizationId}/stats/finance?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetLoanProductRequestQuery,
  useGetMicrofinBranchesRequestQuery,
  useGetOrganisationsRequestQuery,
  useGetMicrofinStaffMembersQuery,
  useGetMicrofinOrgStaffMembersQuery,
  useGetLoanStatsQuery,
  useGetOrganisationStatsQuery,
  useGetOverviewStatsQuery,
  useGetfinanceStatsQuery,
} = SummaryRequest;
