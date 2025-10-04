import { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import TransactionTable from "./components/TransactionTable"; // expects a “transactions” prop
import { AiOutlineDownload } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

/* Tab definitions + demo data ------------------------------------------- */
const tabs = [
  { name: "All",   filter: () => true },
  { name: "Deposit",   filter: (t) => t.type === "deposit" },
  { name: "Withdraw",  filter: (t) => t.type === "withdraw" },
  { name: "Trade",     filter: (t) => t.type === "trade" },
];

const dummy = [
  {
    id: "TXN001",
    date: "2025-10-04",
    time: "09:30 AM",
    type: { name: "deposit", tag: "Bank Transfer" },
    amount: "₹81,123.10",
    status: "completed",
    description: "Deposit INR via Bank Transfer",
    paymentMethod: "NEFT",
    transactionFee: "₹0.00",
    currency: "INR",
    reference: "REF123456789"
  },
  {
    id: "TXN002",
    date: "2025-10-04",
    time: "10:15 AM",
    type: { name: "withdraw", tag: "Crypto" },
    amount: "0.52 BTC",
    status: "processing",
    description: "Withdraw BTC to External Wallet",
    paymentMethod: "Crypto Network",
    transactionFee: "0.0001 BTC",
    currency: "BTC",
    reference: "REF987654321"
  },
  {
    id: "TXN003",
    date: "2025-10-04",
    time: "11:45 AM",
    type: { name: "trade", tag: "Swap" },
    amount: "0.13 BTC",
    status: "completed",
    description: "Swap BTC to ETH",
    paymentMethod: "Internal Exchange",
    transactionFee: "0.001 BTC",
    currency: "BTC",
    reference: "REF456789123"
  },
  {
    id: "TXN004",
    date: "2025-10-04",
    time: "02:30 PM",
    type: { name: "deposit", tag: "Crypto" },
    amount: "0.8 BTC",
    status: "completed",
    description: "Deposit BTC from External Wallet",
    paymentMethod: "Crypto Network",
    transactionFee: "0.00",
    currency: "BTC",
    reference: "REF789123456"
  },
  {
    id: "TXN005",
    date: "2025-10-04",
    time: "03:45 PM",
    type: { name: "withdraw", tag: "Bank" },
    amount: "₹250,000.00",
    status: "pending",
    description: "Withdraw INR to Bank Account",
    paymentMethod: "IMPS",
    transactionFee: "₹10.00",
    currency: "INR",
    reference: "REF321654987"
  }
];

/* Utility: convert displayed rows → CSV string -------------------------- */
const toCSV = (rows) =>
  [
    ["ID", "Date", "Time", "Type", "Amount", "Status", "Description", "Payment Method", "Transaction Fee", "Currency", "Reference"].join(","),
    ...rows.map(({ id, date, time, type, amount, status, description, paymentMethod, transactionFee, currency, reference }) =>
      [id, date, time, type.name, amount, status, description, paymentMethod, transactionFee, currency, reference].join(",")
    ),
  ].join("\n");

const TransactionPage = () => {
   const { isAuthenticated } = useAuth();
     const navigator = useNavigate();
    if (!isAuthenticated) {
       navigator("/signin");
       
    } 

  const [activeTab, setActiveTab]   = useState("All");
  const [query, setQuery]           = useState("");

  /* 1) filter by tab, 2) filter by search term -------------------------- */
  const visibleTx = useMemo(() => {
    const tab = tabs.find((t) => t.name === activeTab);
    const byTab = dummy.filter((t) => tab.filter(t));
    return query
      ? byTab.filter((t) =>
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.type.name.toLowerCase().includes(query.toLowerCase()) ||
          t.paymentMethod.toLowerCase().includes(query.toLowerCase())
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
      {/* Header Section with Export button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 mb-2 sm:mb-3 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Transaction History</h2>
        <button
          onClick={exportCSV}
          className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <AiOutlineDownload className="mr-2 text-xl" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-hidden">
        {/* Tab bar + search */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 pb-4 border-b">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 min-w-max">
              {tabs.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTab(t.name)}
                  className={`flex items-center  gap-1 px-1 sm:gap-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-200 
                    ${
                      activeTab === t.name
                        ? "bg-blue-600 text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                    }`}
                >
                  {t.name}
                  <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
                    ${activeTab === t.name 
                      ? "bg-white bg-opacity-20 text-white" 
                      : "bg-gray-200 text-gray-700"}`}>
                    {dummy.filter(t.filter).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72 xl:w-96">
            <input
              type="search"
              placeholder="Search by description, type, or payment method..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow duration-200 hover:shadow-sm"
            />
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>
        </div>

        {/* Transaction Count Summary */}
        <div className="py-3 px-1">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{visibleTx.length}</span> transactions
            {activeTab !== "All" && <span> in <span className="font-medium text-gray-900">{activeTab}</span></span>}
            {query && <span> matching "<span className="font-medium text-gray-900">{query}</span>"</span>}
          </p>
        </div>

        {/* Table with responsive wrapper */}
        <div className="relative overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <div className="inline-block min-w-full align-middle">
              <TransactionTable transactions={visibleTx} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionPage;
