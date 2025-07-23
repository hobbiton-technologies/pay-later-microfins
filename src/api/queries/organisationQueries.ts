import { Api } from "../apiSlice";

export interface MouLoansOrganisationData {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  contactNo: string;
  address: string;
  email: string;
  tPinNumber: string;
  members: [
    {
      id: number;
      user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        isSystemAdmin: boolean;
      };
      idType: string;
      idNumber: string;
      employeeIdNumber: string;
      position: string;
      isOrganisationAdmin: boolean;
      isEnabled: boolean;
      maximumLoanAmountPerMonth: number;
    }
  ];
  sector: string;
  isDeactivated: boolean;
}

export interface MouLoansOrganisationResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: "string";
  data: MouLoansOrganisationData[];
  errors: ["string"];
}

const OrganisationRequests = Api.injectEndpoints({
  endpoints: (builder) => ({
    getMouLoansOrganisations: builder.query<
      MouLoansOrganisationResponse,
      { id: number; query: string; pageSize: number; pageNumber: number }
    >({
      query: ({ id, query, pageSize, pageNumber }) => {
        const params = new URLSearchParams();

        // if (id) params.append("id", id.toString());
        if (query) params.append("Query", query.toString());
        if (pageSize) params.append("PageSize", pageSize.toString());
        if (pageNumber) params.append("PageNumber", pageNumber.toString());

        return `organizations?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMouLoansOrganisationsQuery } = OrganisationRequests;
