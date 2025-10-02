import { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import TransactionTable from "./components/TransactionTable"; // expects a “transactions” prop
import { AiOutlineDownload } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

/* Tab definitions + demo data ------------------------------------------- */
const tabs = [
  { name: "All",   filter: () => true },
  { name: "Deposit",   filter: (t) => t.type === "deposit" },
  { name: "Withdraw",  filter: (t) => t.type === "withdraw" },
  { name: "Trade",     filter: (t) => t.type === "trade" },
];

const dummy = [
  { id: 1, type: "deposit",  desc: "Deposit INR",  amount: 81_123.1,  currency: "₹" },
  { id: 2, type: "withdraw", desc: "Withdraw BTC", amount: 0.52,      currency: "BTC" },
  { id: 3, type: "trade",    desc: "Swap BTC→ETH",amount: 0.13,      currency: "BTC" },
  { id: 4, type: "deposit",  desc: "Deposit BTC", amount: 0.8,       currency: "BTC" },
];

/* Utility: convert displayed rows → CSV string -------------------------- */
const toCSV = (rows) =>
  [
    ["ID", "Type", "Description", "Amount", "Currency"].join(","),
    ...rows.map(({ id, type, desc, amount, currency }) =>
      [id, type, desc, amount, currency].join(",")
    ),
  ].join("\n");

const TransactionPage = () => {
  const [activeTab, setActiveTab]   = useState("All");
  const [query, setQuery]           = useState("");

  /* 1) filter by tab, 2) filter by search term -------------------------- */
  const visibleTx = useMemo(() => {
    const tab       = tabs.find((t) => t.name === activeTab);
    const byTab     = dummy.filter(tab.filter);
    return query
      ? byTab.filter((t) =>
          t.desc.toLowerCase().includes(query.toLowerCase())
        )
      : byTab;
  }, [activeTab, query]);

  /* Trigger CSV download ------------------------------------------------ */
  const exportCSV = () => {
    const blob = new Blob([toCSV(visibleTx)], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout title="Transactions">
      {/* Export button */}
      <div className="flex justify-end mt-6 mb-3">
        <button
          onClick={exportCSV}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          <AiOutlineDownload className="mr-2" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {/* Tab bar + search */}
        <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.name}
                onClick={() => setActiveTab(t.name)}
                className={`flex items-center gap-2 px-3 py-1 rounded
                  ${
                    activeTab === t.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {t.name}
                <span className="bg-gray-500 text-white rounded-full px-2 text-xs">
                  {dummy.filter(t.filter).length}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <BsSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Table */}
        <TransactionTable transactions={visibleTx} />
      </div>
    </DashboardLayout>
  );
};

export default TransactionPage;
