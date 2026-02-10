import {
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Trophy,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [expanded, setExpanded] = useState(false);
  const navs = [
    { name: "DASHBOARD", link: "/", icon: Home },
    { name: "ANALYTICS", link: "/analytics", icon: ChartNoAxesCombined },
    { name: "ACHIEVEMENTS", link: "/achievements", icon: Trophy },
    { name: "PROFILE", link: "/profile", icon: User },
    { name: "SETTINGS", link: "/settings", icon: Settings },
  ];
  return (
    <aside
      className={`h-full ${expanded ? "w-64" : "w-16"} hidden md:flex flex-col items-center bg-card-base border-r border-border-base transition-all duration-300 ease-in-out`}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="w-full h-14 flex items-center px-5 cursor-pointer hover:bg-border-base/10 transition-colors"
      >
        {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </div>

      <div className="flex flex-col w-full mt-4">
        {navs.map((nav, i) => (
          <Link
            to={nav.link}
            key={i}
            className={`w-full h-12 flex items-center gap-4 hover:bg-border-base/10 transition-colors group ${expanded ? "px-5" : "justify-center"}`}
            title={nav.name}
          >
            <nav.icon
              size={20}
              className="text-text-base group-hover:scale-110 transition-transform"
            />
            {expanded && (
              <span className="text-xs font-bold tracking-widest">
                {nav.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideNav;
