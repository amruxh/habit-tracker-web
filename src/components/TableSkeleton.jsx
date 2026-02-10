import React from "react";

const TableSkeleton = ({ rows = 5, cols = 7 }) => {
  return (
    <div className="w-full overflow-hidden border-2 border-border-base bg-card-base animate-pulse">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-border-base">
            <th className="px-4 py-3 border-r-2 border-border-base w-32 md:w-auto">
              <div className="h-4 bg-border-base/20 rounded w-20"></div>
            </th>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="size-10 border-r-2 border-border-base">
                <div className="h-4 bg-border-base/20 rounded w-4 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr
              key={i}
              className="border-b-2 border-border-base last:border-b-0"
            >
              <td className="px-4 py-3 border-r-2 border-border-base">
                <div className="h-4 bg-border-base/20 rounded w-24"></div>
              </td>
              {Array.from({ length: cols }).map((_, j) => (
                <td
                  key={j}
                  className="size-10 border-r-2 border-border-base p-2"
                >
                  <div className="size-full bg-border-base/10 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
