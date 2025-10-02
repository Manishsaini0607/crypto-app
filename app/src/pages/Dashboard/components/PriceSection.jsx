import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const PriceSection = () => {
  const timestamps = ["7:15 PM", "7:55 PM", "8:55 PM", "9:55 PM", "10:55 PM"];
  const [activeTab, setActiveTab] = useState("1H");

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* header row */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
        {/* balances */}
        <div>
          <p className="text-sm text-gray-700">Wallet Balances</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
            <span className="text-3xl font-medium">22.39401000</span>
            <span className="flex items-center font-medium text-green-500">
              <BsArrowUpRight className="mr-1" /> 22%
            </span>
          </div>
        </div>

        {/* action buttons */}
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
            <AiFillPlusCircle className="mr-2" /> Buy
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
            <AiOutlineMinusCircle className="mr-2" /> Sell
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-6 flex justify-end">
        <div className="flex rounded-md bg-gray-100 p-1">
          {["1H", "1D", "1W", "1M"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm px-3 py-1 rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-white shadow font-semibold"
                  : "text-gray-600 hover:bg-white hover:shadow"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* panel content */}
      <div className="mt-8">
        {activeTab === "1H" ? (
          <>
            <img src="/graph.svg" alt="Graph" className="w-full" />
            <div className="flex justify-between mt-4 text-sm text-gray-700">
              {timestamps.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Content not available</p>
        )}
      </div>
    </div>
  );
};

export default PriceSection;
