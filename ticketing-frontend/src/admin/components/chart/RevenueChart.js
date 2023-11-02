import React from "react";

const RevenueChart = ({ children, title }) => {
  return (
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
      <p className="mb-4 font-semibold text-gray-800">
        {title}
      </p>
      {children}
    </div>
  );
};

export default RevenueChart;
