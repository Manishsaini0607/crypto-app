const TransactionTable = ({ transactions }) => {
  /* Tailwind tag colors by status */
  const badge = {
    pending:    "text-gray-600  bg-gray-200",
    processing: "text-yellow-700 bg-yellow-100",
    completed:  "text-green-700  bg-green-100",
    cancelled:  "text-red-700   bg-red-100",
  };

  // Mobile Card View Component
  const TransactionCard = ({ transaction }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
      {/* Header: ID and Status */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-mono text-gray-600">{transaction.id}</span>
        <span
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold uppercase ${
            badge[transaction.status]
          }`}
        >
          {transaction.status}
        </span>
      </div>

      {/* Amount and Type */}
      <div className="mb-3">
        <div className="text-lg font-semibold text-gray-900">{transaction.amount}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium capitalize">{transaction.type.name}</span>
          {transaction.type.tag && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {transaction.type.tag}
            </span>
          )}
        </div>
      </div>

      {/* Date and Time */}
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <span className="font-medium">{transaction.date}</span>
        <span className="mx-2">•</span>
        <span>{transaction.time}</span>
      </div>

      {/* Additional Details */}
      <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method:</span>
          <span className="font-medium">{transaction.paymentMethod}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Fee:</span>
          <span className="font-medium">{transaction.transactionFee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Reference:</span>
          <span className="font-mono text-xs">{transaction.reference}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Date & Time",
                "Type",
                "Amount",
                "Status",
                "Payment Method",
                "Fee",
                "Reference"
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {/* ID */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                  {row.id}
                </td>

                {/* Date & time */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{row.date}</span>
                    <span className="text-xs text-gray-500">{row.time}</span>
                  </div>
                </td>

                {/* Type + tag */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium capitalize">{row.type.name}</span>
                    {row.type.tag && (
                      <span className="text-xs text-gray-500">{row.type.tag}</span>
                    )}
                  </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  {row.amount}
                </td>

                {/* Status badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold uppercase ${badge[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Payment Method */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {row.paymentMethod}
                </td>

                {/* Transaction Fee */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {row.transactionFee}
                </td>

                {/* Reference */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                  {row.reference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
