import { Api } from "../apiSlice";

export interface OrganisationData {
  name: "string";
  contactNo: "string";
}

const OrganisationRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateOrganisation: builder.mutation<any, any>({
      query: ({ organizationId, organisationData }) => ({
        url: `/microfins/${organizationId}/microfin-organizations`,
        method: "POST",
        body: organisationData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MicrofinOrganisations"],
    }),
  }),
});

export const { useCreateOrganisationMutation } = OrganisationRequest;
