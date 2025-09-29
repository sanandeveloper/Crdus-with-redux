import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Addpost from "./Addpost.jsx";
import Allpost from "./Allpost.jsx";
import Header from "./Header/Header.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import CustomModal from "./CustomModal.jsx";
import { ToastContainer } from "react-toastify";
import Updated from "./Updated.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addpost",
        element: <Addpost />,
      },
      {
        path: "/allpost",
        element: <Allpost />,
      },
      {
        path: "/updated/:id",
        element: <Updated />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <ToastContainer   position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light" />
    <RouterProvider router={router} />
  </Provider>
);
