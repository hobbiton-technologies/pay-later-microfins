import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Lipila-Later",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5132",
  }),
  tagTypes: ["LoanProducsts"],
  endpoints: () => ({}),
});
