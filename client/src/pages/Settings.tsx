import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LocalStorage, db } from "@/lib/db";
import { Download, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState(LocalStorage.getTheme());
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    LocalStorage.getNotificationsEnabled()
  );
  const [soundEnabled, setSoundEnabled] = useState(LocalStorage.getSoundEnabled());
  const [vibrationEnabled, setVibrationEnabled] = useState(
    LocalStorage.getVibrationEnabled()
  );

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "hi", name: "हिन्दी" },
    { code: "id", name: "Bahasa Indonesia" },
    { code: "ar", name: "العربية" },
    { code: "sw", name: "Kiswahili" },
    { code: "zh", name: "中文" },
  ];

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as any);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    LocalStorage.setTheme(newTheme);
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    LocalStorage.setNotificationsEnabled(enabled);
  };

  const handleSoundChange = (enabled: boolean) => {
    setSoundEnabled(enabled);
    LocalStorage.setSoundEnabled(enabled);
  };

  const handleVibrationChange = (enabled: boolean) => {
    setVibrationEnabled(enabled);
    LocalStorage.setVibrationEnabled(enabled);
  };

  const handleExportData = async () => {
    try {
      const data = await db.exportData();
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `firstlight-backup-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t("message.savedSuccessfully"));
    } catch (error) {
      toast.error(t("message.errorSaving"));
    }
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await db.importData(data);
      toast.success("Data imported successfully");
      // Reload page to reflect changes
      window.location.reload();
    } catch (error) {
      toast.error("Failed to import data");
    }
  };

  const handleClearData = async () => {
    if (
      window.confirm(
        t("settings.clearDataConfirm")
      )
    ) {
      try {
        await db.clearAllData();
        LocalStorage.clear();
        toast.success(t("message.dataCleared"));
        window.location.reload();
      } catch (error) {
        toast.error(t("message.errorSaving"));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          {t("settings.title")}
        </h1>

        {/* Language Settings */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {t("settings.language")}
          </h2>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </Card>

        {/* Theme Settings */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {t("settings.theme")}
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-slate-700">Light</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-slate-700">Dark</span>
            </label>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {t("settings.notifications")}
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => handleNotificationsChange(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-slate-700">{t("settings.enableNotifications")}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => handleSoundChange(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-slate-700">{t("settings.soundEnabled")}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={vibrationEnabled}
                onChange={(e) => handleVibrationChange(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-slate-700">{t("settings.vibrationEnabled")}</span>
            </label>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {t("settings.dataManagement")}
          </h2>
          <div className="space-y-3">
            <Button
              onClick={handleExportData}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              {t("settings.exportData")}
            </Button>
            <label className="block">
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
                id="import-file"
              />
              <Button
                onClick={() => document.getElementById('import-file')?.click()}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                {t("settings.importData")}
              </Button>
            </label>
            <Button
              onClick={handleClearData}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t("settings.clearData")}
            </Button>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {t("settings.about")}
          </h2>
          <div className="space-y-2 text-slate-700">
            <p>
              <strong>FirstLight</strong> - Maternal & Child Health Platform
            </p>
            <p>{t("settings.version")}: 1.0.0</p>
            <p>© 2026 FirstLight. All rights reserved.</p>
            <p className="text-sm text-slate-600 mt-4">
              FirstLight is an offline-first maternal and child health platform designed
              for low-resource settings. It supports pregnancy tracking, vaccination
              schedules, nutrition logging, and health summaries.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
