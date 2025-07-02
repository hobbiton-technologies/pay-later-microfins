import { Api } from "../apiSlice";

// export interface ProductsData {
//   id: number;
//   name: string;
//   type: string;
//   paymentPeriod: string;
//   minAmount: number;
//   maxAmount: number;
//   status: string;
//   arrangedRate: number;
//   interestRate: number;
// }

export interface ProductsData {
  id: number;
  issueNo: string;
  remarks: string;
  bidType: string;
  payee: string;
  investor: string;
  investmentType: string;
  companyName: string;
  refNo: string;
  tenderDate: string;
  payment: number;
  couponRate: number;
  faceValue: number;
  tenor: number;
  issueDate: string;
  remainingDays: number;
  maturityDate: string;
  interestDate: string;
  price: number;
  withholdingTax: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsDataResponse {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  data: ProductsData[];
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
        params.append("pageNumber", pageNumber.toString());
        params.append("pageSize", pageSize.toString());

        return `/investment-management/get-government-bonds?${params.toString()}`;
      },
      providesTags: ["LoanProducsts"],
    }),
  }),
});

export const { useGetGovernmentBondsRequestQuery } = SummaryRequest;
