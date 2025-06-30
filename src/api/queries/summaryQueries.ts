import Api from "../apiSlice";

export interface ProductsData {
  name: string;
  type: string;
  paymentPeriod: string;
  minAmount: number;
  maxAmount: number;
  status: string;
  arrangedRate: number;
  interestRate: number;
}

export const SummaryRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    getSummaryData: builder.query<any, any>({
      query: ({}) => {
        return ``;
      },
    }),
  }),
});
