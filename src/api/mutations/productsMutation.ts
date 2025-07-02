import Api from "../apiSlice";

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
  loanProductCharges: [
    {
      name: string;
      calculateByRate: boolean;
      amount: number;
      rate: number;
    }
  ];
  productStatus: string;
  isCollateralBased: boolean;
  loanDocuments: [
    {
      name: string;
      isRequired: boolean;
    }
  ];
  isMouBased: boolean;
  microfinBranches: number[];
}

const ProductsMutation = Api.injectEndpoints({
  endpoints: (builder) => ({
    CreateLoadProduct: builder.query<any, any>({
      query: () => {
        return `;`;
      },
    }),
  }),
});

export const { useCreateLoadProductQuery } = ProductsMutation;
