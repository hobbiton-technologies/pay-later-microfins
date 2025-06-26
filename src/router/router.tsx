import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import Layout from "../layout";
import Summary from "../modules/Summary";
import { SignIn } from "../auth/pages/Signin";
import ProtectedRoute from "../auth/protectedRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signIn" element={<SignIn />} />
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Summary />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
