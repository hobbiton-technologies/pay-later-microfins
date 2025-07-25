import { Api } from "../apiSlice";

export interface MouProductsData {
  id: 0;
  createdAt: "2025-07-25T08:36:34.995Z";
  updatedAt: "2025-07-25T08:36:34.995Z";
  mouFileId: 0;
  microfin: {
    id: 0;
    name: "string";
    contactNo: "string";
    address: "string";
    email: "string";
    loanOperations: ["MouLoans"];
  };
  organization: {
    id: 0;
    name: "string";
    contactNo: "string";
    address: "string";
    email: "string";
    tPinNumber: "string";
    sector: "Other";
    isDeactivated: true;
  };
  proposedBy: {
    id: 0;
    user: {
      id: 0;
      firstName: "string";
      lastName: "string";
      email: "string";
      phoneNumber: "string";
    };
    idType: "None";
    idNumber: "string";
    branch: "string";
    position: "string";
  };
  loanProducts: [
    {
      id: 0;
      name: "string";
      loanProductType: "EmergencyAdvance";
      maximumRepaymentPeriod: 0;
      productStatus: "InActive";
      gracePeriodInDays: 0;
      interestRate: 0;
      minimumLoanAmount: 0;
      maximumLoanAmount: 0;
      maximumLoanRate: 0;
      insuranceRate: 0;
      arrangementFeeRate: 0;
      isCollateralBased: true;
    }
  ];
  mouStatus: "Pending";
  startDate: "2025-07-25T08:36:34.995Z";
  endDate: "2025-07-25T08:36:34.995Z";
  responders: [
    {
      id: 0;
      mouId: 0;
      responder: {
        id: 0;
        user: {
          id: 0;
          firstName: "string";
          lastName: "string";
          email: "string";
          phoneNumber: "string";
        };
        employeeIdNumber: "string";
        position: "string";
        idType: "None";
        idNumber: "string";
        isOrganizationDeactivated: true;
      };
      response: "Accept";
      comment: "string";
    }
  ];
}

export interface MouStatsData {
  all: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export interface MouStatsResponse {
  statusCode: number;
  message: string;
  data: MouStatsData;
  errors: string[];
}

const MouRequests = Api.injectEndpoints({
  endpoints: (builder) => ({
    getMouStats: builder.query<MouStatsResponse, { id: number }>({
      query: ({ id }) => {
        return `microfins/${id}/stats/mous`;
      },
    }),

    getMouProducts: builder.query<any, any>({
      query: ({}) => {
        const params = new URLSearchParams();

        return `mous/proposals?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMouStatsQuery } = MouRequests;
