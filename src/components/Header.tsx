import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../public/logo.webp";

const menu = [
  { label: "Home", to: "/intro" },
  { label: "Quiz", to: "/quiz" },
  { label: "Chatbot", to: "/chatbot" },
  { label: "AI Usage", to: "/ai-usage" },
  { label: "Q&A", to: "/qa" }, // Thêm Q & A vào menu
];

const Header: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-white/30 backdrop-blur-lg shadow-lg border-b border-white/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-18 h-9 rounded-l shadow-md bg-white/70 p-1"
          />
          <span className="text-2xl font-extrabold text-[#2a2e6e] tracking-wide hidden sm:block drop-shadow-lg">
            HCM202 - SE1725
          </span>
        </Link>
        <nav className="hidden md:flex gap-2 lg:gap-6">
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 rounded-xl font-semibold transition text-[#2a2e6e] hover:bg-[#e0e7ff] hover:text-[#3a3f8f] shadow-sm backdrop-blur-md ${
                location.pathname === item.to
                  ? "bg-[#dbeafe] text-[#3a3f8f]"
                  : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-xl text-[#2a2e6e] hover:bg-[#e0e7ff] focus:outline-none shadow"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <motion.nav
          className="md:hidden flex flex-col gap-1 px-4 pb-4 bg-white/80 backdrop-blur-xl rounded-b-2xl shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-4 py-3 rounded-xl font-semibold transition text-[#2a2e6e] hover:bg-[#e0e7ff] hover:text-[#3a3f8f] shadow-sm ${
                location.pathname === item.to
                  ? "bg-[#dbeafe] text-[#3a3f8f]"
                  : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </header>
  );
};

export default Header;
