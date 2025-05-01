import App from "../App";
import Allproperties from "../pages/AllProperties";
// import Events from "../pages/Events";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
    //   { path: "/events", element: <Events /> },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/allproperties",
        element: <Allproperties/>
      }
    ],
  },
];

export default routes;
