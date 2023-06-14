import { Navigate, Outlet } from "react-router-dom";
import RootLayout from "./layout";

export const ProtectedRoute = () => {
  const isAuth = true;

  return !isAuth ? (
    <Navigate to="/login" />
  ) : (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};
