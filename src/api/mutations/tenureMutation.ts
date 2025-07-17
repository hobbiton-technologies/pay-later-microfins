import { Api } from "../apiSlice";

export interface TenureBody {
  period: number;
  interestRate: number;
  loanProductId: number;
}

const TenureMutations = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateTenure: builder.mutation<any, any>({
      query: ({ organizationId, clientId, tenureData }) => ({
        url: `microfins/${organizationId}/mass-market/clients/${clientId}/tenures`,
        method: "POST",
        body: tenureData,
      }),
    }),
  }),
});

export const { useCreateTenureMutation } = TenureMutations;
