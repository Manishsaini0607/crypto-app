import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const PriceSection = () => {
  const timestamps = ["7:15 PM", "7:55 PM", "8:55 PM", "9:55 PM", "10:55 PM"];
  const [activeTab, setActiveTab] = useState("1H");

  return (
    <div className="bg-white rounded-xl h-full">
      {/* header row */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
          {/* balances */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-gray-600">Current Balance</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <span className="text-3xl font-bold text-gray-900">22.39401000</span>
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <BsArrowUpRight className="inline mr-1" /> +22%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </div>

          {/* action buttons */}
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <AiFillPlusCircle className="mr-2 text-xl" /> 
              <span className="font-medium">Buy</span>
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <AiOutlineMinusCircle className="mr-2 text-xl" /> 
              <span className="font-medium">Sell</span>
            </button>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-6 flex justify-end">
          <div className="flex rounded-lg bg-white shadow-sm p-1">
            {["1H", "1D", "1W", "1M"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm px-4 py-1.5 rounded-md transition-all duration-200 font-medium
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md transform scale-105"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* panel content */}
      <div className="p-6">
        {activeTab === "1H" ? (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute top-0 left-0 p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Current Price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-sm text-gray-600">Average</span>
                  </div>
                </div>
              </div>
              <img src="/graph.svg" alt="Price Graph" className="w-full" />
            </div>
            <div className="flex justify-between mt-4">
              {timestamps.map((t) => (
                <span key={t} className="text-sm text-gray-600 font-medium">{t}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-500">
            <p className="text-center">
              <span className="block text-xl font-semibold mb-2">No Data Available</span>
              <span className="text-sm">Please check back later</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceSection;
