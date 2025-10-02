import {
  AiOutlineInfoCircle,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";

const PortfolioSection = () => {
  return (
    <div className="flex flex-col xl:flex-row justify-between bg-white rounded-xl p-6">
      {/* Left-hand data blocks */}
      <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-16">
        {/* Total value */}
        <div>
          <div className="flex items-center text-gray-700">
            <p className="text-sm">Total Portfolio Value</p>
            <AiOutlineInfoCircle className="ml-1" />
          </div>
          <p className="text-3xl font-medium">&#x20B9; 112,312.24</p>
        </div>

        {/* Wallet balances */}
        <div>
          <p className="text-sm text-gray-700 mb-1">Wallet Balances</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div className="flex items-center">
              <p className="text-3xl font-medium">22.39401000</p>
              <span className="ml-2 bg-gray-300 text-gray-700 rounded-full px-3 py-1 font-medium">
                BTC
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-3xl font-medium">&#x20B9; 1,300.00</p>
              <span className="ml-2 bg-gray-300 rounded-full px-3 py-1">INR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-4 mt-4 xl:mt-0">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
          <AiOutlineArrowDown className="mr-2" /> Deposit
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
          <AiOutlineArrowUp className="mr-2" /> Withdraw
        </button>
      </div>
    </div>
  );
};

export default PortfolioSection;
