import { Api } from "../apiSlice";

export interface ProposeMouPayload {
  OrganisationId: number;
  LoanProductIds: number[];
  PayrollRunDate: number;
  StartDate: Date;
  EndDate: Date;
  Doc: File;
}

const MouMutations = Api.injectEndpoints({
  endpoints: (builder) => ({
    createMouProposal: builder.mutation<any, any>({
      query: ({ mouProposalData }) => ({
        url: `mous/proposals`,
        body: mouProposalData,
        method: "POST",
      }),
      invalidatesTags: ["MouProposals"],
    }),
  }),
});

export const { useCreateMouProposalMutation } = MouMutations;
