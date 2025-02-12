import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./components/Home";
import Users from "./components/Users";
import Base from "./common/Base";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import Rulebook from "./components/add-rule";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Base />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/setting",
        element: <UserProfile />,
      },
      {
        path: "/add-rule",
        element: <Rulebook />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
