import { Api } from "../apiSlice";

export interface ProductsBody {
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
  calculateInterestByRate: boolean;
  minimumInterestRate: number;
  maximumInterestRate: number;
  minimumInterestAmount: number;
  maximumInterestAmount: number;
  interestType: string;
  calculatePenalty: boolean;
  calculatePenaltyByRate: boolean;
  penaltyRate: number;
  penaltyAmount: number;
  penaltyCalculationMethod: string;
  // Changed from tuple to array
  loanProductCharges: {
    name: string;
    calculateByRate: boolean;
    amount: number;
    rate: number;
  }[];
  productStatus: string;
  isCollateralBased: boolean;
  // Changed from tuple to array
  loanDocuments: {
    name: string;
    isRequired: boolean;
  }[];
  isMouBased: boolean;
  microfinBranches: number[];
}

const ProductsMutation = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateLoadProduct: builder.mutation<
      any,
      { organizationId: number; loanProductData: ProductsBody }
    >({
      query: ({ organizationId, loanProductData }) => ({
        url: `/microfins/${organizationId}/products`,
        method: "POST",
        body: loanProductData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["LoanProducsts"],
    }),
  }),
});

export const { useCreateLoadProductMutation } = ProductsMutation;
