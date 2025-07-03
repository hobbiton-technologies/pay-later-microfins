import { Api } from "../apiSlice";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    organizationId: number;
  };
  errors: string[];
}

const AuthRequest = Api.injectEndpoints({
  endpoints: (builder) => ({
    LoginUser: builder.mutation({
      query: (loginData) => ({
        url: `/api/v1/auth/microfins/login`,
      }),
    }),
  }),
});
