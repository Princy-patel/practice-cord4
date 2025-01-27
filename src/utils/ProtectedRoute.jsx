import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

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

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
