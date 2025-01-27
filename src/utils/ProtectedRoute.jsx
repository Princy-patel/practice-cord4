import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("userData");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user && JSON.parse(user).email.includes("admin")) {
      navigate("/users");
    } else {
      navigate("/");
    }
  }, [navigate, user]);

  return user ? children : null;
}

export default ProtectedRoute;
