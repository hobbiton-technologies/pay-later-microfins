import { Api } from "../apiSlice";

export interface BranchesData {
  microfinId: number;
  name: string;
  address: string;
  phoneNumber: string;
  branchId: string;
}

const BranchRequests = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateBranch: builder.mutation<
      any,
      { organizationId: number; branchData: BranchesData }
    >({
      query: ({ organizationId, branchData }) => ({
        url: `/microfins/${organizationId}/branches`,
        method: "POST",
        body: branchData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Branchess"],
    }),
  }),
});

export const { useCreateBranchMutation } = BranchRequests;
