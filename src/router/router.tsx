import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import Layout from "../layout";

import ProtectedRoute from "../auth/protectedRoutes";
import Summary from "../modules/summary/Summary";
import StaffMembers from "../modules/business/StaffMembers";
import { Financials } from "../modules/financials/Financials";
import { MoneyLenders } from "../modules/moneylenders/MoneyLenders";
import { MOUs } from "../modules/business/MOUs";
import { Clients } from "../modules/moneylenders/Clients";
import { Loans } from "../modules/moneylenders/Loans";
import { SalaryLoans } from "../modules/financials/SalaryLoans";
import { RecoverySchedules } from "../modules/financials/RecoverySchedules";
import { Reporting } from "../modules/financials/Reporting";
import { Products } from "../modules/summary/Products";
import { SignIn } from "@/auth/pages/signIn";
import Branches from "@/modules/business/Branches";
import Organisation from "@/modules/business/Organisation";
import { MicrofinOrgDetailsPage } from "@/modules/business/components/MicrofinOrgDetailsPage";

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
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff-members"
          element={
            <ProtectedRoute>
              <StaffMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/branches"
          element={
            <ProtectedRoute>
              <Branches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisations"
          element={
            <ProtectedRoute>
              <Organisation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mous"
          element={
            <ProtectedRoute>
              <MOUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salary-loans"
          element={
            <ProtectedRoute>
              <SalaryLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recovery-schedules"
          element={
            <ProtectedRoute>
              <RecoverySchedules />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reporting"
          element={
            <ProtectedRoute>
              <Reporting />
            </ProtectedRoute>
          }
        />

        <Route
          path="/microfin-org-details"
          element={
            <ProtectedRoute>
              <MicrofinOrgDetailsPage />
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
