import { BsCurrencyRupee } from "react-icons/bs";
import { FaBtc } from "react-icons/fa";

const Transactions = () => {
  const transactions = [
    {
      id: "1",
      icon: BsCurrencyRupee,
      text: "INR Deposit",
      amount: "+ ₹81,123.10",
      timestamp: "2022-06-09  7:06 PM",
    },
    {
      id: "2",
      icon: FaBtc,
      text: "BTC Sell",
      amount: "- 12.48513391 BTC",
      timestamp: "2022-06-09  7:06 PM",
    },
    {
      id: "3",
      icon: BsCurrencyRupee,
      text: "INR Deposit",
      amount: "+ ₹81,123.10",
      timestamp: "2022-06-09  7:06 PM",
    },
  ];

  return (
    <div className="bg-white rounded-xl h-full flex flex-col">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-xl border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </div>
          <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
            Today
          </span>
        </div>
      </div>

      {/* Transaction list */}
      <div className="flex-grow overflow-auto p-6 space-y-4">
        {transactions.map((t, i) => (
          <div key={t.id} className="group">
            {i !== 0 && <div className="border-b border-gray-100 mb-4" />}

            <div className="flex gap-4 items-center p-3 rounded-xl transition-all duration-200 hover:bg-gray-50">
              {/* Icon bubble */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 group-hover:scale-110 
                ${t.text.includes('Deposit') 
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                  : 'bg-gradient-to-br from-red-400 to-rose-500 text-white'}`}>
                <t.icon className="text-xl" />
              </div>

              {/* Description + amount */}
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {t.text}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    {t.timestamp}
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-green-600">Completed</span>
                  </p>
                </div>
                <p className={`font-bold whitespace-nowrap text-lg
                  ${t.amount.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {t.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer button */}
      <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-b-xl border-t border-gray-100">
        <button className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default Transactions;
