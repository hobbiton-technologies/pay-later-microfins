import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//  baseUrl: "http://localhost:5132",
export const Api = createApi({
  reducerPath: "Lipila-Later",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bnpl-core.hobbiton.app",
  }),
  tagTypes: ["LoanProducsts"],
  endpoints: () => ({}),
});
