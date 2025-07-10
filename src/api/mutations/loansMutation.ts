import { url } from "inspector";
import { Api } from "../apiSlice";

export interface MicrofinOrgLoansBody {
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

const LoansMutations = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateMicrofinOrgLoan: builder.mutation<any, any>({
      query: ({ organizationId, orgId, memberId, microfinOrgLoanData }) => ({
        url: `microfins/${organizationId}/microfin-organizations/${orgId}/members/${memberId}/loans`,
        method: "POST",
        body: microfinOrgLoanData,
      }),
    }),
  }),
});

export const { useCreateMicrofinOrgLoanMutation } = LoansMutations;
