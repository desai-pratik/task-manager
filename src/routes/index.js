import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

export default function ThemeRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return useRoutes([
    { path: "/", element: user ? <Home /> : <Login />, exact: true },
    { path: "/login", element: <Login />, exact: true },
    { path: "/signup", element: <Register />, exact: true },
  ]);
}
