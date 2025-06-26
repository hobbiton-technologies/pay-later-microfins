import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./auth/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#000080",
              borderRadius: 8,
              fontFamily:
                '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </AuthProvider>
    </>
  );
}

export default App;
