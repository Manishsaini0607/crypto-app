import Dashboard from "./pages/Dashboard/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Support from "./pages/Support/Support";
import TransactionPage from "./pages/Transaction/Transaction";
import Signup from "./pages/Auth/singup/Singup";
import Signin from "./pages/Auth/signin/Signin";
import RegisterEmainVarify from "./pages/Auth/registerEmainVarify/RegisterEmainVarify";
import RegisterSuccess from "./pages/Auth/registerSuccess/RegisterSuccess";
import ForgotPassword from "./pages/Auth/forgot-password/ForgotPassword";
import EmailSentDone from "./pages/Auth/email-sent-done/EmailSentDone";
import ResetPassword from "./pages/Auth/reset-password/ResetPassword";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/transactions",
    element: <TransactionPage />,
  },
  {
    path: "/support",
    element: <Support />,
  },
   {
    path: "/signup",
    element: <Signup />,
  },
   {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/register-email",
    element: <RegisterEmainVarify />,
  },
  {
    path: "/email-verify/:token",
    element: <RegisterSuccess />,
  },
 
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/email-sent",
    element: <EmailSentDone />,

  },
  {
    path: "/forgot-password-verify/:token",
    element: <ResetPassword />,
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
