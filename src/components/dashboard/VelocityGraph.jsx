import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { Zap } from "lucide-react";
import { useMemo } from "react";

const VelocityGraph = ({ habitsData }) => {
  // Calculate velocity graph data from this week's logs
  const miniGraphData = useMemo(() => {
    if (!habitsData) return [];

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Go back to Sunday

    const weekData = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      // Count all logs for this date where status is not "none"
      let count = 0;
      habitsData.forEach((habit) => {
        const log = habit.logs.find((l) => l.date === dateStr);
        if (log && log.status !== "none") {
          count++;
        }
      });

      weekData.push({ day: i + 1, val: count });
    }

    return weekData;
  }, [habitsData]);

  return (
    <div className="lg:col-span-2 retro-border bg-card-base p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={14} className="text-yellow-500" />
        <h2 className="text-[10px] font-bold tracking-widest uppercase">
          WEEKLY_VELOCITY
        </h2>
      </div>
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={miniGraphData}>
            <Area
              type="monotone"
              dataKey="val"
              stroke="var(--text-color)"
              fill="var(--text-color)"
              fillOpacity={0.05}
              strokeWidth={2}
            />
            <XAxis dataKey="day" hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                fontSize: "10px",
              }}
              labelStyle={{ display: "none" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VelocityGraph;
