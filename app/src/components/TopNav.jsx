import { FaBars, FaUserTie } from "react-icons/fa";

const TopNav = ({ title, onOpen }) => {
  return (
    <div className="px-4 bg-white">
      <div className="max-w-7xl h-16 mx-auto flex items-center justify-between">
        {/* Mobile hamburger */}
        <button
          onClick={onOpen}
          className="block lg:hidden text-gray-700 focus:outline-none"
          aria-label="Open menu"
        >
          <FaBars size={24} />
        </button>

        {/* Page title */}
        <h1 className="font-medium text-2xl">{title}</h1>

        {/* User dropdown */}
        <div className="relative">
          <button
            className="focus:outline-none"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="User menu"
            onClick={(e) => {
              const menu = e.currentTarget.nextSibling;
              if (menu) menu.classList.toggle("hidden");
            }}
          >
            <FaUserTie size={24} />
          </button>

          <div className="hidden absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
            <ul className="py-1">
              <li>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </li>
              <li>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Support
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
