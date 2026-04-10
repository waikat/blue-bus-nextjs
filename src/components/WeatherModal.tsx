"use client";

import { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ArrowUp, RefreshCw, Wind } from "lucide-react";
import { useRouter } from "next/navigation";

const STATION_ID = "209895";
const TOKEN      = "146dcf5f-6c5e-4668-a157-e0a082a9f24f";
const API_URL    = `https://swd.weatherflow.com/swd/rest/better_forecast?station_id=${STATION_ID}&token=${TOKEN}&units_wind=kts&units_temp=c&units_pressure=mb&units_precip=mm&units_distance=km`;

const NAVY_DEEP = "hsl(211,100%,12%)";

type Tab = "now" | "hourly" | "daily";

interface CurrentConditions {
  air_temperature:         number;
  feels_like:              number;
  relative_humidity:       number;
  wind_avg:                number;
  wind_gust:               number;
  wind_direction:          number;
  wind_direction_cardinal: string;
  conditions:              string;
  icon:                    string;
  uv:                      number;
  sea_level_pressure:      number;
  time:                    number;
}
interface DailyForecast {
  day_start_local:    number;
  icon:               string;
  air_temp_high:      number;
  air_temp_low:       number;
  wind_avg:           number;
  wind_gust:          number;
  precip_probability: number;
}
interface HourlyForecast {
  icon:                    string;
  wind_avg:                number;
  wind_gust:               number;
  wind_direction:          number;
  wind_direction_cardinal: string;
  local_hour:              number;
}
interface WeatherData {
  current_conditions: CurrentConditions;
  forecast: { daily: DailyForecast[]; hourly: HourlyForecast[] };
}

function windHex(kts: number): string {
  if (kts <  8) return "#888";
  if (kts < 12) return "#0a3a5c";
  if (kts < 16) return "#00b4d8";
  if (kts < 22) return "#06d6a0";
  if (kts < 28) return "#f4a423";
  if (kts < 35) return "#ef4444";
  return "#7c0000";
}
function windBg(kts: number): string {
  if (kts <  8) return "#e5e5e5";
  if (kts < 12) return "#9ecae1";
  if (kts < 16) return "#00b4d8";
  if (kts < 22) return "#06d6a0";
  if (kts < 28) return "#f4a423";
  if (kts < 35) return "#ef4444";
  return "#7c0000";
}
function windTextOnBg(kts: number): string {
  if (kts <  8) return "#444";
  if (kts < 12) return "#0a3a5c";
  return "#fff";
}
function windLabel(kts: number) {
  if (kts <  8) return "Too Light";
  if (kts < 12) return "Light";
  if (kts < 16) return "Good";
  if (kts < 22) return "Great";
  if (kts < 28) return "Strong";
  if (kts < 35) return "Very Strong";
  return "Storm";
}
function windMessage(kts: number) {
  if (kts <  8) return "Too light to kite right now";
  if (kts < 12) return "Light wind. You will want a bigger kite.";
  if (kts < 16) return "Good wind. Solid session ahead.";
  if (kts < 22) return "Epic conditions. Get out there.";
  if (kts < 28) return "Strong wind. Experienced riders only.";
  if (kts < 35) return "Very strong. Advanced riders only.";
  return "Storm conditions. Stay on the beach.";
}

const ICON_MAP: Record<string, string> = {
  "clear-day": "☀️", "clear-night": "🌙", "cloudy": "☁️", "foggy": "🌫️",
  "partly-cloudy-day": "⛅", "partly-cloudy-night": "🌤️",
  "possibly-rainy-day": "🌦️", "possibly-rainy-night": "🌧️",
  "possibly-snow-day": "🌨️", "possibly-snow-night": "🌨️",
  "possibly-thunderstorm-day": "⛈️", "possibly-thunderstorm-night": "⛈️",
  "rainy": "🌧️", "snow": "❄️", "thunderstorm": "⛈️", "windy": "💨",
};
function wxIcon(icon: string) { return ICON_MAP[icon] ?? "🌤️"; }

function dayName(epoch: number) {
  const d = new Date(epoch * 1000); const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Today";
  const tom = new Date(today); tom.setDate(today.getDate() + 1);
  if (d.toDateString() === tom.toDateString()) return "Tmrw";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}
function hourLabel(h: number) {
  if (h === 0) return "12 AM"; if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM"; return `${h - 12} PM`;
}
function arrowStyle(deg: number) { return { transform: `rotate(${deg + 180}deg)` }; }

interface WeatherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WeatherModal({ open, onOpenChange }: WeatherModalProps) {
  const [data,    setData]    = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [tab,     setTab]     = useState<Tab>("now");
  const router = useRouter();

  const fetchWeather = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      setData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load weather data.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (!open) return;
    fetchWeather();
    const id = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [open, fetchWeather]);

  const cur            = data?.current_conditions;
  const daily          = data?.forecast?.daily?.slice(0, 5)   ?? [];
  const hourly         = data?.forecast?.hourly?.slice(0, 13) ?? [];
  const stationOffline = !cur;

  function goToForecast() { onOpenChange(false); router.push("/forecast"); }

  const tabs: { key: Tab; label: string }[] = [
    { key: "now",    label: "Now"      },
    { key: "hourly", label: "12 Hours" },
    { key: "daily",  label: "5 Days"   },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-0 border-2 border-foreground overflow-hidden gap-0 [&>button]:hidden">

        {/* ── HEADER ── */}
        <DialogHeader className="px-6 py-4 border-b-2 border-foreground flex-row items-center justify-between space-y-0" style={{ background: NAVY_DEEP }}>
          <div>
            <DialogTitle className="font-display font-black text-xl uppercase tracking-tighter text-white">Atlantis Beach</DialogTitle>
            <p className="font-display font-black text-xs text-white/40 uppercase tracking-widest mt-0.5">Live Weather. Bonaire.</p>
          </div>
          <div className="flex items-center gap-2">
            {data && (
              <button onClick={fetchWeather} disabled={loading} className="w-9 h-9 border-2 border-white/20 flex items-center justify-center hover:border-accent transition-colors disabled:opacity-40" aria-label="Refresh">
                <RefreshCw className={`w-3.5 h-3.5 text-white/60 ${loading ? "animate-spin" : ""}`} />
              </button>
            )}
            <button onClick={() => onOpenChange(false)} className="w-9 h-9 border-2 border-white/20 flex items-center justify-center hover:border-accent transition-colors" aria-label="Close">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </DialogHeader>

        {/* ── TAB TOGGLE ── */}
        <div className="flex border-b-2 border-foreground bg-background">
          {tabs.map((t, i) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 py-3 font-display font-black text-sm uppercase tracking-widest transition-all duration-300 ${tab === t.key ? "bg-foreground text-background" : "text-foreground/50 hover:text-foreground"} ${i > 0 ? "border-l-2 border-foreground" : ""}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div className="overflow-y-auto max-h-[68vh]">

          {loading && !data && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
              <p className="font-display font-black text-foreground/40 text-sm uppercase tracking-widest">Loading live data...</p>
            </div>
          )}

          {((error && !data) || (data && stationOffline)) && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 px-8 text-center">
              <Wind className="w-10 h-10 text-foreground/20" />
              <p className="font-display font-black uppercase tracking-tighter text-2xl text-foreground">Station Sleeping</p>
              <p className="font-body text-foreground/50 text-sm max-w-xs">No signal from Atlantis Beach right now. Active 9AM to 5PM daily.</p>
              <button onClick={fetchWeather} className="px-6 py-3 border-2 border-foreground font-display font-black text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">Retry</button>
            </div>
          )}

          {/* ── NOW TAB ── */}
          {cur && !stationOffline && tab === "now" && (
            <div>
              <div className="p-6 md:p-8 border-b-2 border-foreground" style={{ background: NAVY_DEEP }}>
                <p className="font-display font-black text-xs text-accent uppercase tracking-widest mb-4">Wind Conditions. Live.</p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-end gap-3 mb-2">
                      <span className="font-display font-black leading-none" style={{ fontSize: "clamp(64px,12vw,100px)", color: windHex(cur.wind_avg) }}>
                        {Math.round(cur.wind_avg)}
                      </span>
                      <span className="font-display font-black text-white/40 text-xl pb-2">kts</span>
                    </div>
                    <p className="font-display font-black text-white/50 text-xs uppercase tracking-widest">
                      Gusting {Math.round(cur.wind_gust)} kts
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-7 h-7 text-accent" style={arrowStyle(cur.wind_direction)} />
                      <span className="font-display font-black text-white text-3xl uppercase">{cur.wind_direction_cardinal}</span>
                    </div>
                    <span className="font-display font-black text-sm uppercase tracking-widest px-3 py-1.5 border-2"
                      style={{ backgroundColor: windBg(cur.wind_avg), color: windTextOnBg(cur.wind_avg), borderColor: windBg(cur.wind_avg) }}>
                      {windLabel(cur.wind_avg)}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="h-1.5 bg-white/10 w-full">
                    <div className="h-full transition-all duration-700" style={{ width: `${Math.min(100, (cur.wind_avg / 35) * 100)}%`, backgroundColor: windHex(cur.wind_avg) }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="font-display font-black text-[10px] text-white/30 uppercase">0</span>
                    <span className="font-display font-black text-[10px] text-white/30 uppercase">35 kts</span>
                  </div>
                </div>
              </div>

              <div className="border-b-2 border-foreground px-6 py-4" style={{ backgroundColor: windBg(cur.wind_avg) }}>
                <p className="font-display font-black text-sm uppercase tracking-widest" style={{ color: windTextOnBg(cur.wind_avg) }}>
                  {windMessage(cur.wind_avg)}
                </p>
                <p className="font-body text-xs mt-1" style={{ color: windTextOnBg(cur.wind_avg), opacity: 0.65 }}>
                  Live from Tempest station. Atlantis Beach.
                </p>
              </div>

              <div className="grid grid-cols-2 border-b-2 border-foreground">
                <div className="p-5 border-r-2 border-foreground">
                  <p className="font-display font-black text-xs text-foreground/40 uppercase tracking-widest mb-2">Conditions</p>
                  <p className="font-display font-black text-lg text-foreground uppercase tracking-tighter leading-tight">{cur.conditions}</p>
                  <p className="font-body text-xs text-foreground/40 mt-1">{wxIcon(cur.icon)} UV {cur.uv}</p>
                </div>
                <div className="p-5">
                  <p className="font-display font-black text-xs text-foreground/40 uppercase tracking-widest mb-2">Temperature</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-black text-3xl text-foreground leading-none">{Math.round(cur.air_temperature)}</span>
                    <span className="font-display font-black text-base text-foreground/40">°C</span>
                  </div>
                  <p className="font-body text-xs text-foreground/40 mt-1">Feels {Math.round(cur.feels_like)}°C</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="p-5 border-r-2 border-foreground">
                  <p className="font-display font-black text-xs text-foreground/40 uppercase tracking-widest mb-2">Humidity</p>
                  <p className="font-display font-black text-2xl text-foreground">{cur.relative_humidity}%</p>
                </div>
                <div className="p-5">
                  <p className="font-display font-black text-xs text-foreground/40 uppercase tracking-widest mb-2">Pressure</p>
                  <p className="font-display font-black text-2xl text-foreground">{Math.round(cur.sea_level_pressure)} <span className="text-base text-foreground/40">mb</span></p>
                </div>
              </div>
            </div>
          )}

          {/* ── HOURLY TAB ── */}
          {!stationOffline && tab === "hourly" && (
            <div>
              <div className="grid grid-cols-5 px-5 py-3 border-b-2 border-foreground" style={{ background: NAVY_DEEP }}>
                {["Hour", "Sky", "Wind", "Gust", "Dir"].map((c, i) => (
                  <span key={c} className={`font-display font-black text-xs uppercase tracking-widest text-white ${i === 0 ? "" : i === 4 ? "text-right" : "text-center"}`}>{c}</span>
                ))}
              </div>
              {hourly.length === 0 && !loading && (
                <p className="text-center font-display font-black text-foreground/40 text-sm uppercase tracking-widest py-12">No hourly data available.</p>
              )}
              {hourly.map((h, i) => (
                <div key={i} className={`grid grid-cols-5 items-center px-5 py-4 hover:bg-foreground/5 transition-colors ${i < hourly.length - 1 ? "border-b-2 border-foreground" : ""}`}>
                  <span className="font-display font-black text-sm text-foreground uppercase">{hourLabel(h.local_hour)}</span>
                  <span className="text-center" style={{ fontSize: 18 }}>{wxIcon(h.icon)}</span>
                  <div className="text-center">
                    <span className="font-display font-black text-sm px-2 py-1 inline-block"
                      style={{ backgroundColor: windBg(h.wind_avg), color: windTextOnBg(h.wind_avg) }}>
                      {Math.round(h.wind_avg)}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-display font-black text-sm text-foreground/50">{Math.round(h.wind_gust)}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <ArrowUp className="w-3 h-3 text-accent flex-shrink-0" style={arrowStyle(h.wind_direction)} />
                    <span className="font-display font-black text-xs text-foreground uppercase">{h.wind_direction_cardinal}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── DAILY TAB ── */}
          {!stationOffline && tab === "daily" && (
            <div>
              <div className="grid grid-cols-5 px-5 py-3 border-b-2 border-foreground" style={{ background: NAVY_DEEP }}>
                {["Day", "Sky", "Wind", "Gust", "Rain"].map((c, i) => (
                  <span key={c} className={`font-display font-black text-xs uppercase tracking-widest text-white ${i === 0 ? "" : i === 4 ? "text-right" : "text-center"}`}>{c}</span>
                ))}
              </div>
              {daily.length === 0 && !loading && (
                <p className="text-center font-display font-black text-foreground/40 text-sm uppercase tracking-widest py-12">No forecast data available.</p>
              )}
              {daily.map((d, i) => (
                <div key={i} className={`grid grid-cols-5 items-center px-5 py-4 hover:bg-foreground/5 transition-colors ${i < daily.length - 1 ? "border-b-2 border-foreground" : ""}`}>
                  <div>
                    <p className="font-display font-black text-sm text-foreground uppercase tracking-tighter">{dayName(d.day_start_local)}</p>
                    <p className="font-display font-black text-xs text-foreground/40 uppercase">{Math.round(d.air_temp_high)}° / {Math.round(d.air_temp_low)}°</p>
                  </div>
                  <span className="text-center" style={{ fontSize: 20 }}>{wxIcon(d.icon)}</span>
                  <div className="text-center">
                    <span className="font-display font-black text-sm px-2 py-1 inline-block"
                      style={{ backgroundColor: windBg(d.wind_avg), color: windTextOnBg(d.wind_avg) }}>
                      {Math.round(d.wind_avg)}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-display font-black text-sm text-foreground/50">{Math.round(d.wind_gust)}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-black text-sm" style={{ color: d.precip_probability > 50 ? "#ef4444" : undefined }}>{d.precip_probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div className="px-5 py-3 border-t-2 border-foreground bg-foreground flex-shrink-0 flex items-center justify-between gap-4">
          <p className="font-display font-black text-xs text-white/40 uppercase tracking-widest">Live. Tempest. Atlantis Beach.</p>
          <button onClick={goToForecast} className="font-display font-black text-xs uppercase tracking-widest text-accent hover:text-accent/70 transition-colors whitespace-nowrap flex-shrink-0">
            Full Forecast →
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
