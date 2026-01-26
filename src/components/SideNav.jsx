import { ChartNoAxesCombined, ChevronLeft, ChevronRight, Home, Settings, Trophy, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
    const [expanded, setExpanded] = useState(false);
    const navs = [
        { name: "Dashboard", link: "/", icon: Home },
        { name: "Analytics", link: "/analytics", icon: ChartNoAxesCombined },
        { name: "Leaderboard", link: "/leaderboard", icon: Trophy },
        { name: "Profile", link: "/profile", icon: User },
        { name: "Settings", link: "/settings", icon: Settings, className: 'group-hover:rotate-180' },
    ];
    return (
        <aside className={`h-full ${expanded ? 'w-64' : 'w-16'} flex flex-col items-center bg-white border-r`}>
            <div onClick={() => setExpanded(!expanded)} className="w-full h-14 flex items-center px-5 cursor-pointer">
                {
                    expanded ?
                        <ChevronRight className="text-2xl transition-all duration-300 hover:scale-110" />
                        :
                        <ChevronLeft className="text-2xl transition-all duration-300 hover:scale-110" />
                }
            </div>

            {navs.map((nav, i) => (
                <Link to={nav.link} key={i} className={`w-full h-14 flex items-center gap-3 hover:bg-gray-300/30 transition-hover duration-300 cursor-pointer group ${expanded ? 'px-5' : 'justify-center'}`}>
                    <nav.icon className={`text-2xl transition-all duration-300 group-hover:scale-110 ${nav?.className ?? ''}`} />
                    {expanded && nav.name}
                </Link>
            ))}
        </aside>
    );
};

export default SideNav;