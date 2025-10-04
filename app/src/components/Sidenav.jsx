import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsArrowDownUp } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const Sidenav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let { user } = useAuth();
  const [authUser, setAuthUser] = useState(user);

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("authUser"));
      if (storedUser) {
        setAuthUser(storedUser);
      } else {
        navigate("/signin");
      }
    }
  }, [user, navigate]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { icon: RxDashboard, text: "Dashboard", link: "/" },
    { icon: BsArrowDownUp, text: "Transactions", link: "/transactions" },
  ];

  if (!authUser) return null; // Prevent rendering until user is ready

  return (
    <div className="flex flex-col justify-between bg-white w-full lg:w-64 h-screen shadow-none lg:shadow-lg">
      {/* Logo / heading */}
      <h1 className="text-center text-lg font-semibold pt-14">
        @{authUser.firstName} {authUser.lastName}
      </h1>

      {/* Main nav */}
      <div className="flex-1 mt-6 mx-3">
        {navLinks.map(({ icon: Icon, text, link }) => (
          <Link key={text} to={link}>
            <div
              className={`flex items-center gap-3 rounded-lg py-3 px-4 mb-2 cursor-pointer transition-colors ${
                isActive(link)
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="text-xl" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Support link */}
      <div className="mt-6 mx-3 mb-6">
        <Link to="/support">
          <div
            className={`flex items-center gap-3 rounded-lg py-3 px-4 cursor-pointer transition-colors ${
              isActive("/support")
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <BiSupport className="text-xl" />
            <span className="text-sm font-medium">Support</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidenav;
