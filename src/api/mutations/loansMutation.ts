import { Api } from "../apiSlice";

export interface ExportMicrofinOrgLoan {
  sender: string;
  narration: string;
  spAccount: string;
  remmiterAccount: string;
  senderId: string;
  phoneNumber: string;
  loanIds: number[];
}

export interface ApproveMicrofinLoansBody {
  answer: string;
  comment: string;
}

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
      invalidatesTags: ["CreateLoan"],
    }),

    ApproveMicrofinOrgLoan: builder.mutation<any, any>({
      query: ({
        organizationId,
        microfinOrganisationId,
        loanId,
        approveLoanData,
      }) => ({
        url: `microfins/${organizationId}/microfin-organizations/${microfinOrganisationId}/loans/${loanId}/responses`,
        method: "POST",
        body: approveLoanData,
      }),
      invalidatesTags: ["ApproveLoan"],
    }),

    DisburseMicrofinOrgLoan: builder.mutation<any, any>({
      query: ({ organizationId, microfinOrganisationId, loanId }) => ({
        url: `microfins/${organizationId}/microfin-organizations/${microfinOrganisationId}/loans/${loanId}/disbursements`,
        method: "POST",
      }),
      invalidatesTags: ["DisburseLoan"],
    }),

    ExportMicrofinOrgLoan: builder.mutation<any, any>({
      query: ({ organizationId }) => ({
        url: `microfins/${organizationId}/reports/bank-loans`,
        method: "POST",
      }),
      invalidatesTags: ["DisburseLoan"],
    }),
  }),
});

export const {
  useCreateMicrofinOrgLoanMutation,
  useApproveMicrofinOrgLoanMutation,
  useDisburseMicrofinOrgLoanMutation,
  useExportMicrofinOrgLoanMutation,
} = LoansMutations;
