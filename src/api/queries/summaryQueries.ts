import { Api } from "../apiSlice";

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
  data: [
    {
      month: number;
      monthlyStats: {
        loansTotal: number;
        repaymentsTotal: number;
      };
    }
  ];
  errors: string[];
}

export const SummaryRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    getSummaryData: builder.query<any, any>({
      query: ({}) => {
        return ``;
      },
    }),
    getGovernmentBondsRequest: builder.query<
      ProductsDataResponse,
      {
        id?: string;
        searchQuery?: string;
        pageNumber: number;
        pageSize: number;
      }
    >({
      query: ({ id, searchQuery, pageNumber, pageSize }) => {
        const params = new URLSearchParams();

        if (id) params.append("id", id.toString());
        if (searchQuery) params.append("searchQuery", searchQuery);
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", pageNumber.toString());

        return `/cash-loan-products?${params.toString()}`;
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
      { id: number; pageNumber: number; pageSize: number }
    >({
      query: ({ id, pageNumber, pageSize }) => {
        const params = new URLSearchParams();
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", pageNumber.toString());
        return `/microfins/${id}/microfin-organizations?${params.toString()}`;
      },
    }),

    getMicrofinOrgStaffMembers: builder.query<
      MicrofinOrgStaffResponse,
      {
        id: number;
        organizationId: number;
        query: string;
        pageNumber: number;
        pageSize: number;
      }
    >({
      query: ({ id, organizationId, query, pageNumber, pageSize }) => {
        const params = new URLSearchParams();

        if (id) params.append("id", id.toString());
        if (query) params.append("query", query);
        // params.append("organizationId", organizationId.toString());
        params.append("pageNumber", pageNumber.toString());
        params.append("pageSize", pageSize.toString());

        return `microfins/${organizationId}/microfin-organizations/members?${params.toString()}`;
      },
      providesTags: ["MicrofinStaffMembers"],
    }),

    getMicrofinStaffMembers: builder.query<
      MicrofinStaffResponse,
      {
        id: number;
        organizationId: number;
        query: string;
        pageNumber: number;
        pageSize: number;
      }
    >({
      query: ({ id, organizationId, query, pageNumber, pageSize }) => {
        const params = new URLSearchParams();

        if (id) params.append("id", id.toString());
        if (query) params.append("query", query);
        // params.append("organizationId", organizationId.toString());
        params.append("pageNumber", pageNumber.toString());
        params.append("pageSize", pageSize.toString());

        return `microfins/members?${params.toString()}`;
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
  }),
});

export const {
  useGetGovernmentBondsRequestQuery,
  useGetMicrofinBranchesRequestQuery,
  useGetOrganisationsRequestQuery,
  useGetMicrofinStaffMembersQuery,
  useGetMicrofinOrgStaffMembersQuery,
  useGetLoanStatsQuery,
} = SummaryRequest;
