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
  }),
});

export const { useGetMassMarketClientsQuery } = MassMarketRequest;
