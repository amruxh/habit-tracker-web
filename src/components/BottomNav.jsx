import {
  ChartNoAxesCombined,
  Home,
  Settings,
  Trophy,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const navs = [
    { name: "Home", link: "/", icon: Home },
    { name: "Analytics", link: "/analytics", icon: ChartNoAxesCombined },
    { name: "Achieve.", link: "/achievements", icon: Trophy },
    { name: "Profile", link: "/profile", icon: User },
    { name: "Settings", link: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-card-base border-t border-border-base flex items-center justify-around z-50 md:hidden pb-safe">
      {navs.map((nav, i) => {
        const isActive = location.pathname === nav.link;
        return (
          <Link
            to={nav.link}
            key={i}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive
                ? "text-primary-base"
                : "text-text-base/60 hover:text-text-base"
            }`}
          >
            <nav.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium tracking-wide">
              {nav.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
