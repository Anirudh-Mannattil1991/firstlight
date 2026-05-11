import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useTimeline } from "@/hooks/useTimeline";
import { DateUtils } from "@/lib/utils";
import { Heart, Baby, Apple, Calendar } from "lucide-react";

export default function Timeline() {
  const { t } = useLanguage();
  const { events, loading } = useTimeline();

  const getIcon = (type: string) => {
    switch (type) {
      case "pregnancy":
        return <Heart className="w-5 h-5 text-rose-600" />;
      case "vaccination":
        return <Baby className="w-5 h-5 text-blue-600" />;
      case "nutrition":
        return <Apple className="w-5 h-5 text-green-600" />;
      default:
        return <Calendar className="w-5 h-5 text-slate-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pregnancy":
        return "bg-rose-50 border-l-4 border-rose-500";
      case "vaccination":
        return "bg-blue-50 border-l-4 border-blue-500";
      case "nutrition":
        return "bg-green-50 border-l-4 border-green-500";
      default:
        return "bg-slate-50 border-l-4 border-slate-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {t("timeline.title")}
        </h1>
        <p className="text-slate-600 mb-8">
          {events.length} {events.length === 1 ? "event" : "events"} recorded
        </p>

        {events.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">{t("timeline.noEvents")}</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="relative"
              >
                {/* Timeline connector */}
                {index < events.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-slate-300 to-transparent" />
                )}

                <Card className={`p-6 ${getTypeColor(event.type)}`}>
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(event.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {event.title}
                        </h3>
                        <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-full">
                          {DateUtils.formatDateShort(event.date)}
                        </span>
                      </div>
                      <p className="text-slate-700 mb-2">{event.description}</p>
                      <p className="text-xs text-slate-600">
                        {DateUtils.formatDateTime(event.date)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Event Type Legend */}
        {events.length > 0 && (
          <Card className="p-6 mt-8 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Event Types
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <span className="text-sm text-slate-700">Pregnancy</span>
              </div>
              <div className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-700">Vaccination</span>
              </div>
              <div className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-700">Nutrition</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-700">Other</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
