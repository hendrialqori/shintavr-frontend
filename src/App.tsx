import { lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense } from "react";
import { ProtectedRoute } from "./components/protectedRoute";
import { Loading } from "./components/loading";

// auth
const Login = lazy(async () => await import("@/pages/auth/login"));
const Register = lazy(async () => await import("@/pages/auth/register"));

// main content
const Onboarding = lazy(
  async () => await import("@/pages/dashboard/onboarding")
);
const Formulir = lazy(
  async () => await import("@/pages/dashboard/formPendaftaran")
);
const Profile = lazy(async () => await import("@/pages/dashboard/profile"));
const ListPendaftar = lazy(
  async () => await import("@/pages/dashboard/listPendaftar")
);
const ListGuru = lazy(async () => await import("@/pages/dashboard/listGuru"));
const Feedback = lazy(async () => await import("@/pages/dashboard/feedback"));
const AllUser = lazy(async () => await import("@/pages/dashboard/allUser"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          {/* auth */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* main content */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="/onboarding" replace />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="formulir" element={<Formulir />} />
            <Route path="profile" element={<Profile />} />
            <Route path="list-pendaftar" element={<ListPendaftar />} />
            <Route path="list-guru" element={<ListGuru />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="all-user" element={<AllUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
