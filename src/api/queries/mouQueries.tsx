import { Api } from "../apiSlice";

interface MouLoans {}

export interface MouProductsData {
  id: number;
  createdAt: string;
  updatedAt: string;
  mouFileId: number;
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
  pageNumber: 0;
  pageSize: 0;
  totalItems: 0;
  statusCode: 0;
  message: "string";
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
  }),
});

export const { useGetMouStatsQuery, useGetMouProductsQuery } = MouRequests;
