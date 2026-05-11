import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Heart, Baby, Apple, Clock, FileText, QrCode } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const { t } = useLanguage();

  const features = [
    {
      icon: Heart,
      title: t("pregnancy.title"),
      description: "Track pregnancy milestones and appointments",
      path: "/pregnancy",
    },
    {
      icon: Baby,
      title: t("vaccination.title"),
      description: "Monitor child vaccination schedules",
      path: "/vaccination",
    },
    {
      icon: Apple,
      title: t("nutrition.title"),
      description: "Log daily nutrition and hydration",
      path: "/nutrition",
    },
    {
      icon: Clock,
      title: t("timeline.title"),
      description: "View complete health history",
      path: "/timeline",
    },
    {
      icon: FileText,
      title: t("export.title"),
      description: "Export health summaries as PDF",
      path: "/pregnancy",
    },
    {
      icon: QrCode,
      title: t("export.healthCard"),
      description: "Generate QR health cards",
      path: "/vaccination",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
            {t("home.title")}
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            {t("home.subtitle")}
          </p>
          <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
            {t("home.description")}
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/pregnancy")}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg"
          >
            {t("home.getStarted")}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            {t("home.features")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(feature.path)}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
                    <Icon className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            Why FirstLight?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t("home.offline")}
              </h3>
              <p className="text-slate-600">
                Works completely offline. Your data stays on your device.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t("home.multilingual")}
              </h3>
              <p className="text-slate-600">
                Available in 8 languages for global accessibility.
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t("home.accessible")}
              </h3>
              <p className="text-slate-600">
                Simple, intuitive interface for all literacy levels.
              </p>
            </div>
            <div className="p-6 bg-amber-50 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Mobile-First
              </h3>
              <p className="text-slate-600">
                Optimized for low-bandwidth and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            FirstLight © 2026 - Maternal & Child Health Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
