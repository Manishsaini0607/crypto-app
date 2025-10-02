const TransactionTable = ({ transactions }) => {
  /* Tailwind tag colors by status */
  const badge = {
    pending:    "text-gray-600  bg-gray-200",
    processing: "text-yellow-700 bg-yellow-100",
    completed:  "text-green-700  bg-green-100",
    cancelled:  "text-red-700   bg-red-100",
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* ─── Header ─────────────────────────────────────────────── */}
        <thead className="bg-gray-50">
          <tr>
            {["ID", "Date & Time", "Type", "Amount", "Status"].map((h) => (
              <th
                key={h}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* ─── Body ──────────────────────────────────────────────── */}
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((row) => (
            <tr key={row.id}>
              {/* ID */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                  <span className="text-sm font-medium">{row.type.name}</span>
                  {row.type.tag && (
                    <span className="text-xs text-gray-500">{row.type.tag}</span>
                  )}
                </div>
              </td>

              {/* Amount */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
