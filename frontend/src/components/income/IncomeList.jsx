import React, { useMemo, useState } from "react";
import TransactionInfoCard from "../card/TransactionInfoCard";
import { Download, IndianRupee } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Pagination from "../Pagination";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  const { darkMode } = useOutletContext();

  // ---------------- Pagination Hooks ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return transactions.slice(start, start + itemsPerPage);
  }, [transactions, currentPage]);

  // === Dynamic Styles ===
  const containerClasses = `
    rounded-2xl shadow-lg border overflow-hidden
    ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}
  `;

  const headerClasses = `
    p-6 border-b bg-gradient-to-r
    ${
      darkMode
        ? "from-gray-900 to-gray-800 border-gray-700"
        : "from-purple-50 to-blue-50 border-gray-200"
    }
  `;

  const titleColor = darkMode ? "text-white" : "text-gray-900";
  const subTextColor = darkMode ? "text-gray-400" : "text-gray-600";

  const buttonClasses = `
    flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm border font-medium
    ${
      darkMode
        ? "bg-gray-700 text-purple-400 hover:bg-gray-600 border-gray-600"
        : "bg-white text-purple-600 hover:bg-purple-50 border-gray-200"
    }
  `;

  const emptyIconBg = darkMode ? "bg-gray-700" : "bg-gray-100";
  const emptyTextMain = darkMode ? "text-gray-400" : "text-gray-500";
  const emptyTextSub = darkMode ? "text-gray-500" : "text-gray-400";

  return (
    <div className={containerClasses}>
      {/* ===== Header ===== */}
      <div className={headerClasses}>
        <div className="flex items-center justify-between">
          <div>
            <h5 className={`text-2xl font-bold ${titleColor}`}>
              Income Sources
            </h5>
            <p className={`text-sm mt-1 ${subTextColor}`}>
              {transactions?.length || 0} income{" "}
              {transactions?.length === 1 ? "entry" : "entries"}
            </p>
          </div>

          <button onClick={onDownload} className={buttonClasses}>
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* ===== List / Empty State ===== */}
      <div className="p-6 space-y-3">
        {paginatedData?.length > 0 ? (
          paginatedData.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={income.date}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${emptyIconBg}`}
            >
              <IndianRupee className="w-10 h-10 text-gray-400" />
            </div>
            <p className={`text-lg ${emptyTextMain}`}>No income entries yet</p>
            <p className={`text-sm mt-2 ${emptyTextSub}`}>
              Start tracking your income sources
            </p>
          </div>
        )}
      </div>

      {transactions.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default IncomeList;
