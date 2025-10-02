import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import PortfolioSection from "./components/PortfolioSection";
import PriceSection from "./components/PriceSection";
import Transactions from "./components/Transactions";
import InfoCard from "./components/InfoCard";

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
  const [payment, setPayment] = useState(null);

  /* calculate once on mount */
  useEffect(() => {
    setPayment(monthlyPayment(loanInfo));
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {/* grid wrapper */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* portfolio full-width */}
        <div className="col-span-1 xl:col-span-2">
          <PortfolioSection />
        </div>

        {/* two single-column cards */}
        <PriceSection />
        <Transactions />

        {/* info cards */}
        <div>
          <InfoCard
            imgUrl="/dot_bg.svg"
            tagText="Loan"
            text="Learn more about Loans - keep your Bitcoin yet access its value."
          />
          {payment && (
            <p className="mt-2 text-sm font-medium">
              Estimated Monthly Payment:&nbsp;&#x20B9;{payment}
            </p>
          )}
        </div>

        <InfoCard
          inverted
          tagText="Contact"
          imgUrl="/grid_bg.svg"
          text="Learn more about our real-estate, mortgage, and corporate account services."
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
