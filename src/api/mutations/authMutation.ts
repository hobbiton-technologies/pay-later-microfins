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
    LoginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginData) => ({
        url: `/api/v1/auth/microfins/login`,
        method: "POST",
        body: loginData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = AuthRequest;
