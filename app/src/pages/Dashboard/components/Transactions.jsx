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
    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col">
      <p className="mb-6 text-sm text-gray-700">Recent Transactions</p>

      {/* transaction list */}
      <div className="flex flex-col flex-grow space-y-4 overflow-auto">
        {transactions.map((t, i) => (
          <div key={t.id}>
            {i !== 0 && <hr className="border-gray-200 mb-4" />}

            <div className="flex gap-4 items-center">
              {/* icon bubble */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <t.icon />
              </div>

              {/* description + amount */}
              <div className="flex justify-between w-full">
                <div>
                  <p className="font-semibold">{t.text}</p>
                  <p className="text-sm text-gray-400">{t.timestamp}</p>
                </div>
                <p className="font-semibold whitespace-nowrap">{t.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* footer button */}
      <button className="mt-6 w-full py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none">
        View All
      </button>
    </div>
  );
};

export default Transactions;
