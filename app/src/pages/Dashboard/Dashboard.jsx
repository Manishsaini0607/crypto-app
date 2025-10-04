import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import PortfolioSection from "./components/PortfolioSection";
import PriceSection from "./components/PriceSection";
import Transactions from "./components/Transactions";
import InfoCard from "./components/InfoCard";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// ───────────────────────────────────────── Loan demo
const loanInfo = {
  principal: 50_000,   // example principal
  rate: 0.05,          // 5% APR
  months: 12,
};

const monthlyPayment = ({ principal, rate, months }) => {
  const r = rate / 12;
  return ((principal * r) / (1 - (1 + r) ** -months)).toFixed(2);
};
// ─────────────────────────────────────────────────────

const Dashboard = () => {
   const { isAuthenticated } = useAuth();
    const navigator = useNavigate();
   if (!isAuthenticated) {
      navigator("/signin");
      
   } 

  const [payment, setPayment] = useState(null);

  /* calculate once on mount */
  useEffect(() => {
    setPayment(monthlyPayment(loanInfo));
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your assets today.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Portfolio Section - Full Width */}
        <div className="col-span-1 xl:col-span-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-1">
          <div className="bg-white rounded-xl">
            <PortfolioSection />
          </div>
        </div>

        {/* Price Section with Gradient Border */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-1">
          <div className="bg-white rounded-xl h-full">
            <PriceSection />
          </div>
        </div>

        {/* Transactions Section with Gradient Border */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-1">
          <div className="bg-white rounded-xl h-full">
            <Transactions />
          </div>
        </div>

        {/* Info Cards Section */}
        <div className="space-y-6">
          {/* Loan Card */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-1">
            <div className="bg-white rounded-xl">
              <InfoCard
                imgUrl="/dot_bg.svg"
                tagText="Loan"
                text="Learn more about Loans - keep your Bitcoin yet access its value."
              />
              {payment && (
                <div className="mt-2 px-6 pb-6">
                  <p className="text-sm font-medium text-gray-700">
                    Estimated Monthly Payment:
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    &#x20B9;{payment}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-1">
          <div className="bg-white rounded-xl">
            <InfoCard
              inverted
              tagText="Contact"
              imgUrl="/grid_bg.svg"
              text="Learn more about our real-estate, mortgage, and corporate account services."
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Deposit", icon: "💳", color: "from-blue-500 to-indigo-500" },
          { title: "Withdraw", icon: "💰", color: "from-purple-500 to-pink-500" },
          { title: "Trade", icon: "📈", color: "from-orange-500 to-red-500" },
          { title: "Support", icon: "🤝", color: "from-green-500 to-teal-500" }
        ].map((action) => (
          <button
            key={action.title}
            className={`bg-gradient-to-r ${action.color} text-white rounded-xl p-4 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200`}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="font-semibold">{action.title}</div>
          </button>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
