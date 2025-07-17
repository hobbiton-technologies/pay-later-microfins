import { Api } from "../apiSlice";

export interface MassMarketClientTenure {
  id: number;
  createdAt: string;
  updatedAt: string;
  period: number;
  interestRate: number;
  loanProductName: string;
  loanProductId: number;
}

export interface MassMarketLoantData {
  id: number;
  createdAt: string;
  updatedAt: string;
  amount: number;
  interestRate: number;
  repaymentAmount: number;
  status: string;
  maturityDate: string;
  loanStatus: string;
  borrowerFirstName: string;
  borrowerLastName: string;
  borrowerIdNumber: string;
  microfin: {
    id: number;
    name: string;
    contactNo: string;
    address: string;
    email: string;
  };
  totalRepayments: number;
}

export interface MassMarketClientData {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  microfin: {
    id: number;
    name: string;
    contactNo: string;
    address: string;
    email: string;
  };
  idType: string;
  idNumber: string;
  loanLimit: number;
  isEnabled: boolean;
  tenures: MassMarketClientTenure[];
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface MassMarketLoanResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: MassMarketLoantData[];
  errors: string[];
}

export interface MassMarketResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: MassMarketClientData[];
  errors: string[];
}

const MassMarketRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    GetMassMarketClients: builder.query<
      MassMarketResponse,
      { id: number; query: string; pageSize: number; pageNumber: number }
    >({
      query: ({ id, query, pageSize, pageNumber }) => {
        const params = new URLSearchParams();

        if (query) {
          params.append("query", query);
        }
        params.append("PageSize", pageSize.toString());
        params.append("pageNumber", pageNumber.toString());
        return `microfins/${id}/mass-market/clients?${params.toString()}`;
      },
    }),

    GetMassMarketLoans: builder.query<
      MassMarketLoanResponse,
      {
        organisationId: number;
        id: number;
        clientId: number;
        status: string[];
        loanStatus: string[];
        query: string;
        startDate: string;
        endDate: string;
        pageSize: number;
        pageNumber: number;
      }
    >({
      query: ({
        organisationId,
        id,
        clientId,
        status,
        loanStatus,
        query,
        startDate,
        endDate,
        pageSize,
        pageNumber,
      }) => {
        const params = new URLSearchParams();
        if (id) {
          params.append("id", id.toString());
        }
        if (clientId) {
          params.append("clientId", clientId.toString());
        }
        if (status) {
          params.append("status", status.toString());
        }
        if (loanStatus) {
          params.append("loanStatus", loanStatus.toString());
        }
        if (query) {
          params.append("query", query.toString());
        }
        if (startDate) {
          params.append("startDate", startDate.toString());
        }
        if (endDate) {
          params.append("endDate", endDate.toString());
        }
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", pageNumber.toString());

        return `microfins/${organisationId}/mass-market/loans?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMassMarketClientsQuery, useGetMassMarketLoansQuery } =
  MassMarketRequest;
