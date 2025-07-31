import { Api } from "../apiSlice";

// export interface MouReceiptStats{

// }

export interface MouReceiptingData {
  id: number;
  receiptId: string;
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
    loanOperations: MouLoans[];
  };
  addedBy: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    employeeIdNumber: string;
    position: string;
    idType: string;
    idNumber: string;
    isOrganizationDeactivated: boolean;
  };
  initialAmount: number;
  balance: number;
  status: string;
  receiptUrl: string;
  createdAt: string;
}

export interface MouReceiptingResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: [];
  errors: string[];
}

interface MouLoans {}

export interface MouProductsData {
  id: number;
  microfin: {
    id: number;
    name: string;
    contactNo: string;
    address: string;
    email: string;
    loanOperations: MouLoans[];
  };
  organization: {
    id: number;
    name: string;
    contactNo: string;
    address: string;
    email: string;
    tPinNumber: string;
    sector: string;
    isDeactivated: true;
  };
  proposedBy: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    idType: string;
    idNumber: string;
    branch: string;
    position: string;
  };
  loanProducts: [
    {
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
      isCollateralBased: true;
    }
  ];
  mouStatus: string;
  startDate: string;
  endDate: string;
  responders: [
    {
      id: number;
      mouId: number;
      responder: {
        id: number;
        user: {
          id: number;
          firstName: string;
          lastName: string;
          email: string;
          phoneNumber: string;
        };
        employeeIdNumber: string;
        position: string;
        idType: string;
        idNumber: string;
        isOrganizationDeactivated: true;
      };
      response: string;
      comment: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
  mouFileId: number;
}

export interface MouStatsData {
  all: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export interface MouStatsResponse {
  statusCode: number;
  message: string;
  data: MouStatsData;
  errors: string[];
}

export interface MouProductsResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: MouProductsData[];
  errors: ["string"];
}

const MouRequests = Api.injectEndpoints({
  endpoints: (builder) => ({
    getMouStats: builder.query<MouStatsResponse, { id: number }>({
      query: ({ id }) => {
        return `microfins/${id}/stats/mous`;
      },
    }),

    getMouProducts: builder.query<
      MouProductsResponse,
      {
        id: number;
        microfinId: number;
        organizationId: number;
        startdate: string;
        endDate: string;
        pageSize: number;
        pageNumber: number;
      }
    >({
      query: ({
        id,
        microfinId,
        organizationId,
        startdate,
        endDate,
        pageSize,
        pageNumber,
      }) => {
        const params = new URLSearchParams();

        if (id) params.append("id", id.toString());
        if (microfinId) params.append("MicrofinId", microfinId.toString());
        if (organizationId)
          params.append("OrganizationId", organizationId.toString());
        if (startdate) params.append("Startdate", startdate);
        if (endDate) params.append("endDate", endDate);
        if (pageSize) params.append("PageSize", pageSize.toString());
        if (pageNumber) params.append("PageNumber", pageNumber.toString());

        return `mous/proposals?${params.toString()}`;
      },
      providesTags: ["MouProposals"],
    }),

    getMouReceipting: builder.query<
      MouReceiptingResponse,
      {
        organisationId: number;
        pageSize: number;
        PageNumber: number;
        status: string[];
      }
    >({
      query: ({ organisationId, pageSize, PageNumber, status }) => {
        const params = new URLSearchParams();
        if (status && status.length > 0) {
          status.forEach((s) => params.append("Status", s));
        }
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", PageNumber.toString());

        return `microfins/${organisationId}/receipts?${params.toString()}`;
      },
    }),

    // getMouReceiptingStats: builder.query<>({
    //   query: ({}) => {
    //     return ``;
    //   },
    // }),
  }),
});

export const {
  useGetMouStatsQuery,
  useGetMouProductsQuery,
  useGetMouReceiptingQuery,
} = MouRequests;
