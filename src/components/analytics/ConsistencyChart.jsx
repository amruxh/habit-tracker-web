import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const ConsistencyChart = ({ habitsData }) => {
  // Calculate consistency trend (last 7 days)
  const consistencyData = useMemo(() => {
    if (!habitsData.length) return [];

    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });

      let completed = 0;
      habitsData.forEach((habit) => {
        const log = habit.logs.find((l) => l.date === dateStr);
        if (log && log.status !== "none") {
          completed++;
        }
      });

      weekData.push({
        name: dayName,
        completed,
        total: habitsData.length,
      });
    }
    return weekData;
  }, [habitsData]);

  return (
    <div className="retro-border bg-card-base p-6">
      <h2 className="text-xs font-bold tracking-widest mb-6 uppercase">
        CONSISTENCY_TREND (LAST 7 DAYS)
      </h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={consistencyData}>
            <defs>
              <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--text-color)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--text-color)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="var(--text-color)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-color)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "2px solid var(--border-color)",
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="var(--text-color)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorComp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsistencyChart;
