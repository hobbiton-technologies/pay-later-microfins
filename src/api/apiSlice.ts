import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//  baseUrl: "http://localhost:5132",
export const Api = createApi({
  reducerPath: "Lipila-Later",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bnpl-core.hobbiton.app/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["LoanProducsts"],
  endpoints: () => ({}),
});
