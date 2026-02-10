import { Activity } from "lucide-react";
import { getTimeDifference } from "../../utils/dateHelper";

const RecentActivity = ({ activities }) => {
  const activityData = activities.slice(0, 10).map((activity) => ({
    // Limit to 10
    time: getTimeDifference(activity.created_at),
    action: `${activity.habit?.name} marked ${activity.status}`.toUpperCase(),
  }));

  return (
    <div className="retro-border bg-card-base p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={14} className="text-green-500" />
        <h2 className="text-[10px] font-bold tracking-widest uppercase">
          RECENT_LOGS
        </h2>
      </div>
      <div className="space-y-3">
        {activityData.length === 0 ? (
          <div className="text-[10px] uppercase text-text-base/40 text-center py-4">
            No recent activity
          </div>
        ) : (
          activityData.map((log, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-[10px] border-b border-border-base/50 pb-2 last:border-0 uppercase tracking-tighter"
            >
              <span className="font-bold">{log.action}</span>
              <span className="opacity-50">{log.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
