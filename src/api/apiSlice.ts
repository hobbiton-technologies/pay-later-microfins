import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Api = createApi({
  reducerPath: "Lipila-Later",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: () => ({}),
});

export default Api;
