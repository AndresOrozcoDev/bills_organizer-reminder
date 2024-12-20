import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: any;
  children: JSX.Element;
}

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
