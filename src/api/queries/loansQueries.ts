import { Api } from "../apiSlice";

export interface GetMicrofinLoansData {
  id: number;
  member: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    organization: {
      id: number;
      name: string;
      contactNo: string;
    };
    idType: string;
    idNumber: string;
    position: string;
    activated: true;
    createdAt: string;
    bankDetails: {
      id: number;
      name: string;
      branch: string;
      code: string;
      accountNumber: string;
    };
  };
  amount: number;
  interestRate: number;
  fullLoanAmount: number;
  penaltyRate: number;
  penaltyCalculationMethod: string;
  loanStatus: string;
  loanDocuments: [
    {
      id: number;
      name: string;
      documentUrl: string;
      createdAt: string;
    }
  ];
  comment: string;
  uploadedBy: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    idType: string;
    idNumber: string;
    branch: string;
    position: string;
  };
  resolvedBy: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    idType: string;
    idNumber: string;
    branch: string;
    position: string;
  };
  startDate: string;
  duration: number;
  maturityDate: string;
}

export interface MicrofinLoansResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: GetMicrofinLoansData[];
  errors: string[];
}

const LoansRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    getMicrofinLoans: builder.query<
      MicrofinLoansResponse,
      {
        id: number;
        memberid: number;
        microfinOrganisationId: number;
        query: string;
        loanStatus: string;
        startDate: string;
        endDate: string;
        pageSize: number;
        pageNumber: number;
      }
    >({
      query: ({
        id,
        memberid,
        microfinOrganisationId,
        query,
        loanStatus,
        startDate,
        endDate,
        pageSize,
        pageNumber,
      }) => {
        const params = new URLSearchParams();
        params.append("id", id.toString());
        if (memberid) {
          params.append("memberid", memberid.toString());
        }
        if (microfinOrganisationId) {
          params.append(
            "microfinOrganisationId",
            microfinOrganisationId.toString()
          );
        }
        if (query) {
          params.append("query", query.toString());
        }
        if (loanStatus) {
          params.append("loanStatus", loanStatus.toString());
        }
        if (startDate) {
          params.append("startDate", startDate.toString());
        }
        if (endDate) {
          params.append("endDate", endDate.toString());
        }
        if (pageSize) {
          params.append("pageSize", pageSize.toString());
        }
        if (pageNumber) {
          params.append("pageNumber", pageNumber.toString());
        }

        return `microfins/${id}/microfin-organizations/loans?${params.toString()}`;
      },
      providesTags: ["ApproveLoan"],
    }),
  }),
});

export const { useGetMicrofinLoansQuery } = LoansRequest;
