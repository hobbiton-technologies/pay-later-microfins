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
      query: () => ({
        url: ``,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateOrganisationMutation } = OrganisationRequest;
