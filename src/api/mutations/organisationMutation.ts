import { Api } from "../apiSlice";

export interface OrganisationData {
  name: "string";
  contactNo: "string";
}

const OrganisationRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateOrganisation: builder.mutation<
      any,
      { organizationId: number; organisationData: OrganisationData }
    >({
      query: ({ organizationId, organisationData }) => ({
        url: `/microfins/${organizationId}/microfin-organizations;`,
        method: "POST",
        body: organisationData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateOrganisationMutation } = OrganisationRequest;
