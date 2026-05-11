import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Apple, Clock, Users, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [, navigate] = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Heart, label: t("nav.pregnancy"), path: "/pregnancy" },
    { icon: Baby, label: t("nav.vaccination"), path: "/vaccination" },
    { icon: Apple, label: t("nav.nutrition"), path: "/nutrition" },
    { icon: Clock, label: t("nav.timeline"), path: "/timeline" },
    { icon: Users, label: t("nav.chw"), path: "/chw" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "hi", name: "हिन्दी" },
    { code: "id", name: "Bahasa" },
    { code: "ar", name: "العربية" },
    { code: "sw", name: "Kiswahili" },
    { code: "zh", name: "中文" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-bold text-xl text-rose-600 hover:text-rose-700 transition-colors"
          >
            <Heart className="w-6 h-6" />
            FirstLight
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors text-sm"
                  title={item.label}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="px-2 py-1 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white hover:border-slate-300 transition-colors"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            {/* Settings Button */}
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors hidden sm:block"
              title={t("nav.settings")}
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors text-sm"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                navigate("/settings");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors text-sm"
            >
              <Settings className="w-4 h-4" />
              {t("nav.settings")}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
