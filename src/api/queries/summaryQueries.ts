import Api from "../apiSlice";

export const SummaryRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    getSummaryData: builder.query<any, any>({
      query: ({}) => {
        return ``;
      },
    }),
  }),
});
