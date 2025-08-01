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

    acceptAllocation: builder.mutation<any, any>({
      query: ({ id, receiptId, remark }) => ({
        url: `microfins/${id}/receipts/${receiptId}/accept?remark=${encodeURIComponent(
          remark
        )}`,
        method: "PATCH",
      }),
      invalidatesTags: ["MouReceipts", "MouAllocations"],
    }),

    rejectAllocation: builder.mutation<any, any>({
      query: ({ id, receiptId, remark }) => ({
        url: `microfins/${id}/receipts/${receiptId}/reject?remark=${encodeURIComponent(
          remark
        )}`,
        method: "PATCH",
      }),
      invalidatesTags: ["MouReceipts", "MouAllocations"],
    }),
  }),
});

export const {
  useCreateMouProposalMutation,
  useAcceptAllocationMutation,
  useRejectAllocationMutation,
} = MouMutations;
