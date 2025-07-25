import { Api } from "../apiSlice";

export interface MouStatsData {
  all: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export interface MouStatsResponse {
  statusCode: number;
  message: string;
  data: MouStatsData;
  errors: string[];
}

const MouRequests = Api.injectEndpoints({
  endpoints: (builder) => ({
    getMouStats: builder.query<MouStatsResponse, { id: number }>({
      query: ({ id }) => {
        return `microfins/${id}/stats/mous`;
      },
    }),
  }),
});

export const { useGetMouStatsQuery } = MouRequests;
