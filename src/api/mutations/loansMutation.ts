import { url } from "inspector";
import { Api } from "../apiSlice";

export interface MicrofinOrgLoansBody {
  amount: number;
  interestRate: number;
  penaltyRate: number;
  penaltyCalculationMethod: string;
  // documents: [
  //   {
  //     name: string;
  //     document: string;
  //   }
  // ];
  documents?: { name: string; document: string }[] | null;
  startDate: string;
  duration: number;
}

const LoansMutations = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateMicrofinOrgLoan: builder.mutation<any, any>({
      query: ({
        organizationId,
        microfinOrganisationId,
        microfinMemberId,
        microfinOrgLoanData,
      }) => ({
        url: `microfins/${organizationId}/microfin-organizations/${microfinOrganisationId}/members/${microfinMemberId}/loans`,
        method: "POST",
        body: microfinOrgLoanData,
      }),
    }),
  }),
});

export const { useCreateMicrofinOrgLoanMutation } = LoansMutations;
