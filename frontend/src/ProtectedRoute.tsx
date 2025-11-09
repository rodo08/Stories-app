import { Navigate, Outlet } from "react-router-dom";
import useUser from "./hooks/useUser";

const ProtectedRoute = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <p className="text-center text-white">Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
