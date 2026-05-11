import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { getCHWDashboardData } from "@/data/mockCHWData";
import { DateUtils } from "@/lib/utils";
import { AlertCircle, CheckCircle, Users, Baby, Calendar, Zap } from "lucide-react";

export default function CHWDashboard() {
  const { t } = useLanguage();
  const { mothers, children, metrics } = getCHWDashboardData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "at-risk":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4" />;
      case "at-risk":
        return <AlertCircle className="w-4 h-4" />;
      case "critical":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {t("chw.title")}
        </h1>
        <p className="text-slate-600 mb-8">
          Community health overview and monitoring dashboard
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{t("chw.totalMothers")}</p>
                <p className="text-3xl font-bold text-blue-600">
                  {metrics.totalMothers}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{t("chw.totalChildren")}</p>
                <p className="text-3xl font-bold text-pink-600">
                  {metrics.totalChildren}
                </p>
              </div>
              <Baby className="w-8 h-8 text-pink-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  {t("chw.overdueAppointments")}
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {metrics.overdueAppointments}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  {t("chw.missedVaccinations")}
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {metrics.missedVaccinations}
                </p>
              </div>
              <Zap className="w-8 h-8 text-red-600 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Health Status Summary */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t("chw.healthStatus")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-2">Healthy</p>
              <p className="text-3xl font-bold text-green-600 mb-1">
                {metrics.healthyMothers + metrics.healthyChildren}
              </p>
              <p className="text-xs text-slate-600">
                {metrics.healthyMothers} mothers, {metrics.healthyChildren} children
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-2">At Risk</p>
              <p className="text-3xl font-bold text-yellow-600 mb-1">
                {metrics.atRiskMothers + metrics.atRiskChildren}
              </p>
              <p className="text-xs text-slate-600">
                {metrics.atRiskMothers} mothers, {metrics.atRiskChildren} children
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-2">Critical</p>
              <p className="text-3xl font-bold text-red-600 mb-1">
                {metrics.criticalCases}
              </p>
              <p className="text-xs text-slate-600">Requires immediate attention</p>
            </div>
          </div>
        </Card>

        {/* Mothers List */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t("chw.mothers")}
          </h2>
          <div className="space-y-3">
            {mothers.map((mother) => (
              <div
                key={mother.id}
                className="p-4 bg-slate-50 rounded-lg border-l-4 border-slate-300 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">{mother.name}</p>
                    <p className="text-sm text-slate-600">
                      Age: {mother.age} | Week: {mother.pregnancyWeek}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      mother.status
                    )}`}
                  >
                    {getStatusIcon(mother.status)}
                    {mother.status === "healthy"
                      ? "Healthy"
                      : mother.status === "at-risk"
                      ? "At Risk"
                      : "Critical"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                  <p>Last Visit: {DateUtils.formatDateShort(mother.lastVisit)}</p>
                  <p>Next Visit: {DateUtils.formatDateShort(mother.nextVisit)}</p>
                </div>
                {mother.riskFlags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {mother.riskFlags.map((flag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Children List */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t("chw.children")}
          </h2>
          <div className="space-y-3">
            {children.map((child) => (
              <div
                key={child.id}
                className="p-4 bg-slate-50 rounded-lg border-l-4 border-slate-300 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">{child.name}</p>
                    <p className="text-sm text-slate-600">
                      Mother: {child.motherName} | Age: {child.ageInMonths} months
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      child.status
                    )}`}
                  >
                    {getStatusIcon(child.status)}
                    {child.status === "healthy"
                      ? "Healthy"
                      : child.status === "at-risk"
                      ? "At Risk"
                      : "Critical"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                  <p>Vaccination: {child.vaccinationStatus}</p>
                </div>
                {child.missedVaccines.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {child.missedVaccines.map((vaccine, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                      >
                        {vaccine}
                      </span>
                    ))}
                  </div>
                )}
                {child.riskFlags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {child.riskFlags.map((flag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
