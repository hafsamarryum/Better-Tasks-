import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
  const { token, loading } = useAuthStore();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
