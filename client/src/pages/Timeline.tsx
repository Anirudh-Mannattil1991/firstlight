import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { DateUtils } from "@/lib/utils";
import {
  timelineEventsUserA,
  timelineEventsUserB,
  timelineEventsUserC,
  timelineEventsChildA,
} from "@/data/seedData";
import { Heart, Baby, Apple, Calendar } from "lucide-react";

export default function Timeline() {
  const { t } = useLanguage();
  const [selectedUser, setSelectedUser] = useState("A");

  const allEvents = {
    A: [...timelineEventsUserA, ...timelineEventsChildA],
    B: timelineEventsUserB,
    C: timelineEventsUserC,
  };

  const userLabels = {
    A: "Urban - High Risk + Child",
    B: "Rural - Normal Pregnancy",
    C: "Teenage - Irregular Care",
  };

  const events = allEvents[selectedUser as keyof typeof allEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "pregnancy":
        return "bg-rose-100 text-rose-800";
      case "vaccination":
        return "bg-blue-100 text-blue-800";
      case "nutrition":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {t("timeline.title")}
        </h1>
        <p className="text-slate-600 mb-8">
          Complete health history across different user journeys
        </p>

        {/* User Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(userLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedUser(key)}
              className={`p-4 rounded-xl transition-all text-left ${
                selectedUser === key
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-white text-slate-900 hover:shadow-md border border-slate-200"
              }`}
            >
              <p className="font-semibold">{label}</p>
              <p className="text-sm opacity-75">
                {allEvents[key as keyof typeof allEvents].length} events
              </p>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">{t("timeline.noEvents")}</p>
            </Card>
          ) : (
            events.map((event, index) => (
              <div key={event.id} className="relative">
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
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {event.title}
                          </h3>
                          <span
                            className={`inline-block text-xs font-medium px-2 py-1 rounded mt-1 ${getTypeBadge(
                              event.type
                            )}`}
                          >
                            {event.type === "pregnancy"
                              ? "Pregnancy"
                              : event.type === "vaccination"
                              ? "Vaccination"
                              : event.type === "nutrition"
                              ? "Nutrition"
                              : "Health"}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-slate-600 bg-white bg-opacity-60 px-3 py-1 rounded-full">
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
            ))
          )}
        </div>

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
