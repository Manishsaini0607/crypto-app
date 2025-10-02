import React from "react";
import Sidenav from "./Sidenav";
import TopNav from "./TopNav";
import SideDrawer from "./SideDrawer";

const DashboardLayout = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div className="flex">
      {/* Desktop side-nav */}
      <div className="hidden lg:flex">
        <Sidenav />
      </div>

      {/* Mobile drawer */}
      <SideDrawer isOpen={isOpen} onClose={onClose} />

      {/* Main content */}
      <div className="flex-grow">
        <TopNav title={title} onOpen={onOpen} />

        <div className="overflow-x-hidden overflow-y-auto h-[calc(100vh-88px)] mt-6 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
