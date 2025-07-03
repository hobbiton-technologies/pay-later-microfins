import { Api } from "../apiSlice";

export interface ProductsData {
  id: number;
  microfinId: number;
  microfinName: string;
  name: string;
  loanProductType: string;
  minimumLoanAmount: number;
  maximumLoanAmount: number;
  distributionChannels: string[];
  loanDisbursementTypes: string[];
  minimumRepaymentPeriod: number;
  maximumRepaymentPeriod: number;
  gracePeriodInDays: number;
  repaymentCycles: string[];
  calculateInterestByRate: true;
  minimumInterestRate: number;
  maximumInterestRate: number;
  minimumInterestAmount: number;
  maximumInterestAmount: number;
  interestType: string;
  calculatePenalty: true;
  calculatePenaltyByRate: true;
  penaltyRate: number;
  penaltyAmount: number;
  penaltyCalculationMethod: string;
  loanProductCharges: [
    {
      id: number;
      name: string;
      calculateByRate: true;
      amount: number;
      rate: number;
      createdAt: string;
    }
  ];
  productStatus: string;
  isCollateralBased: true;
  loanDocuments: [
    {
      id: number;
      name: string;
      isRequired: true;
      createdAt: string;
    }
  ];
  isMouBased: true;
  microfinBranches: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      microfin: {
        id: number;
        name: string;
        contactNo: string;
        address: string;
        email: string;
      };
      name: string;
      address: string;
      phoneNumber: string;
      branchId: string;
    }
  ];
}

// export interface ProductsData {
//   id: number;
//   issueNo: string;
//   remarks: string;
//   bidType: string;
//   payee: string;
//   investor: string;
//   investmentType: string;
//   companyName: string;
//   refNo: string;
//   tenderDate: string;
//   payment: number;
//   couponRate: number;
//   faceValue: number;
//   tenor: number;
//   issueDate: string;
//   remainingDays: number;
//   maturityDate: string;
//   interestDate: string;
//   price: number;
//   withholdingTax: number;
//   createdAt: string;
//   updatedAt: string;
// }

export interface ProductsDataResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  statusCode: number;
  message: string;
  data: ProductsData[];
  errors: string[];
}
export const SummaryRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    getSummaryData: builder.query<any, any>({
      query: ({}) => {
        return ``;
      },
    }),
    getGovernmentBondsRequest: builder.query<
      ProductsDataResponse,
      {
        id?: string;
        searchQuery?: string;
        pageNumber: number;
        pageSize: number;
      }
    >({
      query: ({ id, searchQuery, pageNumber, pageSize }) => {
        const params = new URLSearchParams();

        if (id) params.append("id", id.toString());
        if (searchQuery) params.append("searchQuery", searchQuery);
        params.append("PageSize", pageSize.toString());
        params.append("PageNumber", pageNumber.toString());

        return `/cash-loan-products?${params.toString()}`;
      },
      providesTags: ["LoanProducsts"],
    }),
  }),
});

export const { useGetGovernmentBondsRequestQuery } = SummaryRequest;
