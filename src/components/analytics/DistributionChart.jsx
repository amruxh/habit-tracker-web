import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const DistributionChart = ({ habitsData }) => {
  // Calculate distribution across ALL logs
  const distributionData = useMemo(() => {
    if (!habitsData) return [];

    const counts = {
      perfect: 0,
      good: 0,
      average: 0,
      bad: 0,
    };

    habitsData.forEach((habit) => {
      habit.logs.forEach((log) => {
        if (counts[log.status] !== undefined) {
          counts[log.status]++;
        }
      });
    });

    return [
      { name: "Perfect", value: counts.perfect, color: "var(--habit-perfect)" },
      { name: "Good", value: counts.good, color: "var(--habit-good)" },
      { name: "Average", value: counts.average, color: "var(--habit-average)" },
      { name: "Bad", value: counts.bad, color: "var(--habit-bad)" },
    ];
  }, [habitsData]);

  return (
    <div className="retro-border bg-card-base p-6">
      <h2 className="text-xs font-bold tracking-widest mb-6 uppercase">
        HABIT_DISTRIBUTION (ALL TIME)
      </h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart data={distributionData} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              horizontal={false}
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              stroke="var(--text-color)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip
              cursor={{ fill: "var(--border-color)", opacity: 0.1 }}
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "2px solid var(--border-color)",
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {distributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="var(--border-color)"
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionChart;
