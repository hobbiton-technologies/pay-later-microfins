import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Api = createApi({
  reducerPath: "Lipila-Later",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5132",
  }),
  endpoints: () => ({}),
});

export default Api;
