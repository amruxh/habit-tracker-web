import { Check, CheckCheck, Circle } from "lucide-react";

const AchievementCard = ({ title, description, icon, isAchived = false }) => {
  return (
    <div className="flex items-center justify-between gap-2 bg-card-base p-4 border retro-border">
      <div className="flex items-center gap-2">
        {icon}
        <div className="space-y-0.5">
          <h2 className="font-bold tracking-widest uppercase">{title}</h2>
          <p className="text-xs font-normal text-text-base/60">{description}</p>
        </div>
      </div>

      <div>{isAchived ? <CheckCheck /> : <Circle />}</div>
    </div>
  );
};

export default AchievementCard;
