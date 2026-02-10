import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="w-full bg-card-base h-16 flex items-center justify-between px-8 border-b border-border-base">
      <Link
        to={"/"}
        className="text-xl font-bold tracking-tight text-text-base flex items-center overflow-hidden"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mr-px" // Slight spacing to ensure 'H' isn't too close to anim
        >
          H
        </motion.span>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2, // Delay start to let H appear first
              },
            },
          }}
          className="flex"
        >
          {"abit Tracker".split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { width: 0, opacity: 0, x: -10 },
                visible: {
                  width: "auto",
                  opacity: 1,
                  x: 0,
                  transition: { type: "spring", damping: 12, stiffness: 100 },
                },
              }}
              style={{ display: "inline-block", whiteSpace: "pre" }} // preserve space char
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </Link>

      <button
        onClick={toggleTheme}
        className="p-2 hover:bg-border-base/20 cursor-pointer rounded-md transition-colors"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default Header;
