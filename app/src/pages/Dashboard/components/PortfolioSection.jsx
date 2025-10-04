import {
  AiOutlineInfoCircle,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";

const PortfolioSection = () => {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8">
      <div className="flex flex-col xl:flex-row justify-between gap-8">
        {/* Left-hand data blocks */}
        <div className="flex flex-col xl:flex-row gap-8 flex-grow">
          {/* Total value */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 flex-grow">
            <div className="flex items-center text-gray-700 mb-2">
              <p className="text-sm font-medium uppercase tracking-wider">Total Portfolio Value</p>
              <AiOutlineInfoCircle className="ml-2 text-purple-600" />
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">
              &#x20B9; 112,312.24
            </p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <AiOutlineArrowUp className="mr-1" />
              <span>+2.4% from last month</span>
            </div>
          </div>

          {/* Wallet balances */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 flex-grow">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-700 mb-4">
              Wallet Balances
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">22.39401000</p>
                  <span className="ml-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full px-3 py-1 text-sm font-medium">
                    BTC
                  </span>
                </div>
                <span className="text-sm text-gray-600">≈ $947,231.23 USD</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">&#x20B9; 1,300.00</p>
                  <span className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-3 py-1 text-sm font-medium">
                    INR
                  </span>
                </div>
                <span className="text-sm text-gray-600">Available for trading</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row xl:flex-col gap-4 min-w-[200px] justify-center">
          <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            <AiOutlineArrowDown className="mr-2 text-xl" /> 
            <span className="font-semibold">Deposit</span>
          </button>
          <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <AiOutlineArrowUp className="mr-2 text-xl" /> 
            <span className="font-semibold">Withdraw</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
