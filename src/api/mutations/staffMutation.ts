import { Api } from "../apiSlice";

export interface MicrofinStaffBody {
  user: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  idType: string;
  idNumber: string;
  employeeIdNumber: string;
  position: string;
}

export interface MicrofinOrgStaffBody {
  user: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  idType: string;
  idNumber: string;
  position: string;
  bankDetails: {
    name: string;
    branch: string;
    code: string;
    accountNumber: string;
  };
}
const StaffMutions = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateMicrofinStaffMember: builder.mutation<any, any>({
      query: ({ organizationId, branchId, microfinStaffMemberData }) => ({
        url: `/microfins/${organizationId}/branches/${branchId}/members`,
        method: "POST",
        body: microfinStaffMemberData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateMicrofinStaffMemberMutation } = StaffMutions;
