import {
    createBrowserRouter, useNavigate,
  } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Documents from "../components/Documents";
import Chat from "../components/Chat";
import Edit from "../components/Edit";
import Logs from "../components/Logs";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Alldocs from "../components/Alldocs";
import PrivateRoute from "./Privateroute";

const router = createBrowserRouter([
  {
    // Define the root route
    path: "/",
    element: <App />,
    children: [
      {
        // Home route
        path: "/",
        element: <Home />,
      },
      {
        // All documents route
        path: "/documents",
        element: <PrivateRoute><Documents/></PrivateRoute>,
      },
      {
        // Chat route
        path: "/chat",
        element: <PrivateRoute><Chat/></PrivateRoute>,
      },
      {
        // Edit route
        path: "/edit",
        element: <PrivateRoute><Edit/></PrivateRoute>,
      },
      // {
      //   // Edit route based on document id you can use query also !
      //   path: `/edit/:id`,
      //   element: <PrivateRoute><Edit/></PrivateRoute>,
      // },
      {
        // Logs route
        path: "/logs",
        element: <PrivateRoute><Logs/></PrivateRoute>,
      },
      {
        // Alldocs route
        path: "/alldocs",
        element: <PrivateRoute><Alldocs/></PrivateRoute>,
      }
    ],
  },
  {
    // Signup route
    path: "/signup",
    element: <Signup/>
  },
  {
    // Login route
    path: "/login",
    element: <Login/>
  },
]);
  
  export default router;