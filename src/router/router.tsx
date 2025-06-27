import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import Layout from "../layout";

import { SignIn } from "../auth/pages/Signin";
import ProtectedRoute from "../auth/protectedRoutes";
import Summary from "../modules/summary/Summary";
import { StaffMembers } from "../modules/business/StaffMembers";
import { Financials } from "../modules/financials/Financials";
import { MoneyLenders } from "../modules/moneylenders/MoneyLenders";

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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <StaffMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Financials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MoneyLenders />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
