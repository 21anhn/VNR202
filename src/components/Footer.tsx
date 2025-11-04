import React from "react";

const socials = [
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://youtube.com",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.425 3.5 12 3.5 12 3.5s-7.425 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.153 0 12 0 12s0 3.847.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.575 20.5 12 20.5 12 20.5s7.425 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.847 24 12 24 12s0-3.847-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Github",
    url: "https://github.com",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.649.242 2.872.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Quiz", href: "/quiz" },
  { name: "Chatbot", href: "/chatbot" },
  { name: "AI Usage", href: "/ai-usage" },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white/30 text-[#2a2e6e] py-8 px-4 mt-10 backdrop-blur-lg border-t border-white/20 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
          <span className="text-2xl font-extrabold mb-2 tracking-wide text-[#2a2e6e] drop-shadow-lg">
            HCM202
          </span>
          <span className="text-sm text-[#3a3f8f]/70">
            © {new Date().getFullYear()} HCM202 - SE1725. All rights reserved.
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold mb-1 text-[#3a3f8f]">
            Liên kết nhanh
          </span>
          <div className="flex flex-wrap gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#2a2e6e]/80 hover:text-[#6e7fdc] transition text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold mb-1 text-[#3a3f8f]">Kết nối</span>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2a2e6e]/70 hover:text-[#6e7fdc] transition"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
