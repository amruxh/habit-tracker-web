import { useHabitsData } from "../context/HabitsDataContext";
import ConsistencyChart from "../components/analytics/ConsistencyChart";
import DistributionChart from "../components/analytics/DistributionChart";
import SummaryStats from "../components/analytics/SummaryStats";

const Analytics = () => {
  const { habitsData, loading } = useHabitsData();

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto h-full flex items-center justify-center">
        <div className="text-xs font-bold tracking-widest animate-pulse">
          LOADING_ANALYTICS...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      <div className="p-8 max-w-6xl mx-auto h-full">
        <h1 className="text-2xl font-bold tracking-widest mb-8 uppercase">
          ANALYTICS REPORT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Consistency Graph */}
          <ConsistencyChart habitsData={habitsData} />

          {/* Distribution Chart */}
          <DistributionChart habitsData={habitsData} />
        </div>

        {/* Summary Grid */}
        <SummaryStats habitsData={habitsData} />
      </div>
    </div>
  );
};

export default Analytics;
