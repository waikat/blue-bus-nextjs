"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUp, RefreshCw, Wind, Moon } from "lucide-react";

const STATION_ID = "209895";
const TOKEN      = "146dcf5f-6c5e-4668-a157-e0a082a9f24f";
const API_URL    = `https://swd.weatherflow.com/swd/rest/better_forecast?station_id=${STATION_ID}&token=${TOKEN}&units_wind=kts&units_temp=c&units_pressure=mb&units_precip=mm&units_distance=km`;

const OCEAN      = "hsl(213,85%,38%)";
const OCEAN_DEEP = "hsl(213,85%,22%)";
const CYAN       = "hsl(186,100%,42%)";
const SAND       = "hsl(42,35%,97%)";

const CELL_W  = 56;
const LABEL_W = 96;

const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.45 } } };

// ── Types ─────────────────────────────────────────────────────────────────────
interface HourlyForecast {
  local_hour:              number;
  local_day:               number;
  wind_avg:                number;
  wind_gust:               number;
  wind_direction:          number;
  wind_direction_cardinal: string;
  air_temperature:         number;
  icon:                    string;
}
interface DailyForecast {
  day_start_local:    number;
  air_temp_high:      number;
  air_temp_low:       number;
  conditions:         string;
  icon:               string;
  precip_probability: number;
}
interface CurrentConditions {
  wind_avg:                number;
  wind_gust:               number;
  wind_direction:          number;
  wind_direction_cardinal: string;
  air_temperature:         number;
  conditions:              string;
  icon:                    string;
  time:                    number;
}
interface WeatherData {
  current_conditions: CurrentConditions;
  forecast: { hourly: HourlyForecast[]; daily: DailyForecast[] };
}
interface DailyWindSummary {
  day_start_local:    number;
  wind_avg:           number;
  wind_gust:          number;
  air_temp_high:      number;
  air_temp_low:       number;
  icon:               string;
  precip_probability: number;
  hasData:            boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function buildDailyFromHourly(daily: DailyForecast[], hourly: HourlyForecast[]): DailyWindSummary[] {
  return daily.map((d) => {
    const dayOfMonth = new Date(d.day_start_local * 1000).getDate();
    const hours      = hourly.filter((h) => h.local_day === dayOfMonth);
    const hasData    = hours.length > 0;
    const avgWind    = hasData ? Math.round(hours.reduce((s, h) => s + h.wind_avg, 0) / hours.length) : 0;
    const maxGust    = hasData ? Math.round(Math.max(...hours.map((h) => h.wind_gust))) : 0;
    return { day_start_local: d.day_start_local, wind_avg: avgWind, wind_gust: maxGust, air_temp_high: d.air_temp_high, air_temp_low: d.air_temp_low, icon: d.icon, precip_probability: d.precip_probability, hasData };
  });
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
function windLabel(kts: number) {
  if (kts <  8) return "Too Light";
  if (kts < 12) return "Light";
  if (kts < 16) return "Good";
  if (kts < 22) return "Great";
  if (kts < 28) return "Strong";
  if (kts < 35) return "Very Strong";
  return "Storm";
}
function windColor(kts: number): { cell: string; text: string } {
  if (kts <  8) return { cell: "bg-[#c8c8c8]", text: "text-[#444]"    };
  if (kts < 12) return { cell: "bg-[#9ecae1]", text: "text-[#0a3a5c]" };
  if (kts < 16) return { cell: "bg-[#00b4d8]", text: "text-white"     };
  if (kts < 22) return { cell: "bg-[#06d6a0]", text: "text-[#003322]" };
  if (kts < 28) return { cell: "bg-[#f4a423]", text: "text-[#3d1f00]" };
  if (kts < 35) return { cell: "bg-[#ef4444]", text: "text-white"     };
  return               { cell: "bg-[#7c0000]", text: "text-white"     };
}
function gustColor(kts: number): { cell: string; text: string } {
  if (kts < 12) return { cell: "bg-[#e5e5e5]", text: "text-[#555]"    };
  if (kts < 18) return { cell: "bg-[#ffe066]", text: "text-[#3d2e00]" };
  if (kts < 25) return { cell: "bg-[#f4a423]", text: "text-[#3d1f00]" };
  if (kts < 32) return { cell: "bg-[#ef4444]", text: "text-white"     };
  return               { cell: "bg-[#7c0000]", text: "text-white"     };
}
function tempColor(c: number): { cell: string; text: string } {
  if (c < 22) return { cell: "bg-[#9ecae1]", text: "text-[#0a3a5c]" };
  if (c < 28) return { cell: "bg-[#ffe066]", text: "text-[#3d2e00]" };
  return            { cell: "bg-[#f4a423]", text: "text-[#3d1f00]" };
}
function hourLabel(h: number) {
  if (h === 0)  return "12AM";
  if (h < 12)   return `${h}AM`;
  if (h === 12) return "12PM";
  return `${h - 12}PM`;
}
function shortDay(epoch: number) {
  const d = new Date(epoch * 1000); const today = new Date(); const tom = new Date(today);
  tom.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tom.toDateString())   return "Tmrw";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}
function fullDay(epoch: number) {
  const d = new Date(epoch * 1000); const today = new Date(); const tom = new Date(today);
  tom.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tom.toDateString())   return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}
const ICON_MAP: Record<string, string> = {
  "clear-day": "☀️", "clear-night": "🌙", "cloudy": "☁️", "foggy": "🌫️",
  "partly-cloudy-day": "⛅", "partly-cloudy-night": "🌤️",
  "possibly-rainy-day": "🌦️", "possibly-rainy-night": "🌧️",
  "rainy": "🌧️", "snow": "❄️", "thunderstorm": "⛈️", "windy": "💨",
};
function wxIcon(icon: string) { return ICON_MAP[icon] ?? "🌤️"; }

// ── Legend ────────────────────────────────────────────────────────────────────
function Legend() {
  const items = [
    { label: "Too Light",   hex: "#c8c8c8", range: "< 8"   },
    { label: "Light",       hex: "#9ecae1", range: "8–12"  },
    { label: "Good",        hex: "#00b4d8", range: "12–16" },
    { label: "Great",       hex: "#06d6a0", range: "16–22" },
    { label: "Strong",      hex: "#f4a423", range: "22–28" },
    { label: "Very Strong", hex: "#ef4444", range: "28–35" },
    { label: "Storm",       hex: "#7c0000", range: "> 35"  },
  ];
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: item.hex, borderRadius: 3 }} />
          <span className="font-display font-black text-[11px] uppercase tracking-wide text-foreground">{item.label}</span>
          <span className="font-body text-[10px] text-foreground/40">{item.range}</span>
        </div>
      ))}
    </div>
  );
}

// ── Grid components ───────────────────────────────────────────────────────────
function GridRowLabel({ label, sub, dark }: { label: string; sub?: string; dark?: boolean }) {
  return (
    <div
      className={`flex flex-col justify-center flex-shrink-0 px-3 border-r border-b border-black/10 ${dark ? "bg-black/[0.02]" : "bg-white"}`}
      style={{ width: LABEL_W, minWidth: LABEL_W, height: sub ? 56 : 48 }}
    >
      <span className="font-display font-black text-[11px] uppercase tracking-widest text-foreground leading-tight">{label}</span>
      {sub && <span className="font-display font-black text-[9px] text-foreground/40 mt-0.5">{sub}</span>}
    </div>
  );
}
function GridCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex-shrink-0 flex flex-col items-center justify-center text-center border-r border-black/08 ${className}`}
      style={{ width: CELL_W, minWidth: CELL_W }}
    >
      {children}
    </div>
  );
}

// ── Station Offline ───────────────────────────────────────────────────────────
function StationOffline() {
  return (
    <div style={{ background: SAND }} className="min-h-screen">
      <section style={{ background: OCEAN_DEEP }} className="pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8">
          <p className="category-label mb-4" style={{ color: CYAN }}>Atlantis Beach · Bonaire</p>
          <h1 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(48px,8vw,100px)] leading-[0.95]">
            Wind<br />Forecast
          </h1>
        </div>
      </section>

      <section style={{ background: SAND }} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div
            className="flex flex-col md:flex-row gap-10 md:gap-16 items-start p-8 md:p-12 mb-12"
            style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}
          >
            <div className="flex-1">
              <div
                className="w-12 h-12 flex items-center justify-center mb-6"
                style={{ background: OCEAN, borderRadius: 12 }}
              >
                <Moon className="w-6 h-6 text-white" />
              </div>
              <p className="category-label mb-3">Station offline</p>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(28px,4vw,52px)] leading-[0.9] mb-4">
                Wind Station<br />Sleeping
              </h2>
              <p className="font-body text-foreground/60 text-base leading-relaxed">
                Our Tempest station at Atlantis Beach runs daily from 9AM to 5PM Bonaire time. For live wind data right now, use one of the tools below.
              </p>
            </div>
          </div>

          <p className="category-label mb-6">Check the wind now</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tag: "Best for planning",  title: "Windguru", desc: "Hourly model data for Atlantis Beach. Best for planning your next session.", href: "https://www.windguru.cz/209061",         cta: "Open Windguru", primary: false },
              { tag: "Regional picture",   title: "Windy",    desc: "Animated wind map centered on Bonaire. See the full Caribbean picture.",     href: "https://www.windy.com/12.066/-68.282",  cta: "Open Windy",    primary: false },
              { tag: "Our station",        title: "Tempest",  desc: "Live station data direct from Atlantis Beach. Back online at 9AM.",          href: "https://tempestwx.com/station/209895/", cta: "Open Tempest",  primary: true  },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-6 p-6 md:p-8"
                style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}
              >
                <div>
                  <p className="category-label mb-3">{s.tag}</p>
                  <h3 className="font-display font-black text-foreground uppercase tracking-tighter text-2xl leading-tight mb-3">{s.title}</h3>
                  <p className="font-body text-foreground/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
                <a href={s.href} target="_blank" rel="noopener noreferrer"
                  className={s.primary ? "btn-cyan self-start" : "btn-outline-dark self-start"}>
                  {s.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Forecast() {
  const [data,        setData]        = useState<WeatherData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      setData(await res.json());
      setLastUpdated(new Date());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchData]);

  if (!loading && error && !data) return <StationOffline />;

  const cur           = data?.current_conditions;
  const hourly        = data?.forecast?.hourly?.slice(0, 96) ?? [];
  const daily         = data?.forecast?.daily?.slice(0, 7)   ?? [];
  const stationOffline = !cur;

  if (!loading && data && stationOffline) return <StationOffline />;

  const dailyWithWind = buildDailyFromHourly(daily, hourly);
  const daily5        = dailyWithWind.slice(0, 5);

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const dayGroups: { day: number; count: number; epoch: number }[] = [];
  hourly.forEach((h) => {
    const last = dayGroups[dayGroups.length - 1];
    if (last && last.day === h.local_day) {
      last.count++;
    } else {
      const matchDaily = daily.find((d) => new Date(d.day_start_local * 1000).getDate() === h.local_day);
      let epoch = matchDaily?.day_start_local ?? 0;
      if (!epoch) {
        const todayDay = todayDate.getDate();
        let dayOffset = h.local_day - todayDay;
        if (dayOffset < 0) dayOffset += 31;
        const d = new Date(todayDate);
        d.setDate(todayDate.getDate() + dayOffset);
        epoch = Math.floor(d.getTime() / 1000);
      }
      dayGroups.push({ day: h.local_day, count: 1, epoch });
    }
  });

  return (
    <div style={{ background: SAND }} className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ background: OCEAN_DEEP }} className="pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="category-label mb-4" style={{ color: CYAN }}>Atlantis Beach · Bonaire</p>
              <h1 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(44px,8vw,100px)] leading-[0.95]">
                Wind<br />Forecast
              </h1>
            </div>
            <div className="flex items-center gap-3 pb-2">
              {lastUpdated && (
                <span className="font-display font-black text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Updated {lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <button
                onClick={fetchData}
                disabled={loading}
                className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-40"
                style={{ background: "rgba(255,255,255,0.10)", borderRadius: 8 }}
                aria-label="Refresh"
              >
                <RefreshCw className={`w-4 h-4 text-white/60 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOADING ──────────────────────────────────────────────────────────── */}
      {loading && !data && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: CYAN, borderTopColor: "transparent" }} />
          <p className="font-display font-black text-foreground/40 text-sm uppercase tracking-widest">Loading forecast...</p>
        </div>
      )}

      {data && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* ── CURRENT CONDITIONS ───────────────────────────────────────────── */}
          {cur && (
            <motion.div
              initial="hidden" animate="visible" variants={fadeIn}
              className="mb-12 overflow-hidden"
              style={{ borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.05)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">

                {/* Left — big wind number */}
                <div
                  className="p-8 md:p-12 flex flex-col justify-between gap-8"
                  style={{ background: OCEAN_DEEP }}
                >
                  <p className="category-label" style={{ color: CYAN }}>Live Wind · Right Now</p>
                  <div>
                    <div className="flex items-end gap-3 mb-2">
                      <span
                        className="font-display font-black leading-none"
                        style={{ fontSize: "clamp(72px,12vw,140px)", color: windHex(Math.round(cur.wind_avg)) }}
                      >
                        {Math.round(cur.wind_avg)}
                      </span>
                      <span className="font-display font-black text-2xl pb-3" style={{ color: "rgba(255,255,255,0.35)" }}>kts</span>
                    </div>
                    <p className="font-display font-black text-sm uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Gusting {Math.round(cur.wind_gust)} kts
                    </p>
                  </div>
                  <div>
                    <div className="h-1.5 w-full mb-1.5" style={{ background: "rgba(255,255,255,0.10)", borderRadius: 9999 }}>
                      <div
                        className="h-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (cur.wind_avg / 35) * 100)}%`, backgroundColor: windHex(Math.round(cur.wind_avg)), borderRadius: 9999 }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="font-display font-black text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>0</span>
                      <span className="font-display font-black text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>35 kts</span>
                    </div>
                  </div>
                </div>

                {/* Right — condition + direction + temp */}
                <div className="grid grid-cols-1 divide-y divide-black/08 bg-white">
                  <div className="p-6 md:p-8">
                    <p className="category-label mb-3">Conditions</p>
                    <p
                      className="font-display font-black uppercase tracking-tighter leading-none mb-2"
                      style={{ fontSize: "clamp(36px,5vw,60px)", color: windHex(Math.round(cur.wind_avg)) }}
                    >
                      {windLabel(cur.wind_avg)}
                    </p>
                    <p className="font-body text-foreground/50 text-sm">{cur.conditions}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-black/08">
                    <div className="p-6 md:p-8">
                      <p className="category-label mb-3">Direction</p>
                      <div className="flex items-center gap-2 mb-1">
                        <ArrowUp
                          className="w-7 h-7 flex-shrink-0"
                          style={{ color: CYAN, transform: `rotate(${cur.wind_direction + 180}deg)` }}
                        />
                        <span
                          className="font-display font-black text-foreground uppercase tracking-tighter"
                          style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
                        >
                          {cur.wind_direction_cardinal}
                        </span>
                      </div>
                      <p className="font-display font-black text-foreground/40 text-xs uppercase tracking-widest">{cur.wind_direction}°</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="category-label mb-3">Temp</p>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="font-display font-black text-foreground leading-none" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
                          {Math.round(cur.air_temperature)}
                        </span>
                        <span className="font-display font-black text-foreground/40 text-lg">°C</span>
                      </div>
                      <p className="font-body text-foreground/40 text-xs">{wxIcon(cur.icon)} {cur.conditions}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── MOBILE: 5-DAY SCROLL ─────────────────────────────────────────── */}
          {daily5.length > 0 && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="md:hidden mb-12"
            >
              <p className="category-label mb-4">5-Day Outlook</p>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x pb-2">
                {daily5.map((d, i) => {
                  const { cell, text } = d.hasData ? windColor(d.wind_avg) : { cell: "bg-black/05", text: "text-foreground/30" };
                  return (
                    <div
                      key={i}
                      className="snap-start flex-shrink-0 flex flex-col items-center gap-2 p-4"
                      style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)", minWidth: 90 }}
                    >
                      <p className="font-display font-black text-xs uppercase tracking-widest text-foreground/60">
                        {shortDay(d.day_start_local)}
                      </p>
                      <span style={{ fontSize: 22 }}>{wxIcon(d.icon)}</span>
                      <div className={`w-full py-2 px-1 text-center ${cell}`} style={{ borderRadius: 6 }}>
                        {d.hasData ? (
                          <p className={`font-display font-black text-lg leading-none ${text}`}>{d.wind_avg}</p>
                        ) : (
                          <p className="font-display font-black text-xs text-foreground/20">—</p>
                        )}
                      </div>
                      <p className="font-display font-black text-[10px] text-foreground/40 uppercase">
                        {Math.round(d.air_temp_high)}°/{Math.round(d.air_temp_low)}°
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── DESKTOP: HOURLY GRID ─────────────────────────────────────────── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="hidden md:block mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
              <div>
                <p className="category-label mb-2">96-Hour Breakdown</p>
                <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(28px,4vw,52px)] leading-[0.9]">
                  Hour by Hour
                </h2>
              </div>
              <Legend />
            </div>

            <div
              className="overflow-hidden mb-3"
              style={{ borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.08)" }}
            >
              <div className="flex">
                {/* Fixed label column */}
                <div className="flex-shrink-0 flex flex-col" style={{ width: LABEL_W, minWidth: LABEL_W }}>
                  <div className="border-b border-r border-black/10 flex-shrink-0" style={{ background: OCEAN_DEEP, height: 44 }} />
                  <GridRowLabel label="Hour" dark />
                  <GridRowLabel label="Wind" sub="kts" />
                  <GridRowLabel label="Dir" dark />
                  <GridRowLabel label="Gust" sub="kts" />
                  <GridRowLabel label="Sky" dark />
                  <GridRowLabel label="Temp" sub="°C" />
                </div>

                {/* Scrollable data */}
                <div className="flex-1 overflow-x-auto hide-scrollbar">
                  {/* Day headers */}
                  <div className="flex border-b border-black/10" style={{ background: OCEAN_DEEP, height: 44 }}>
                    {dayGroups.map((group, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 flex items-center px-3"
                        style={{ width: group.count * CELL_W, minWidth: group.count * CELL_W, background: 'hsl(213,85%,22%)', borderLeft: '1px solid rgba(255,255,255,0.15)' }}
                      >
                        <span className="font-display font-black text-xs uppercase tracking-widest text-white whitespace-nowrap">
                          {fullDay(group.epoch)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Hour */}
                  <div className="flex border-b border-black/08 bg-black/[0.02]">
                    {hourly.map((h, i) => (
                      <GridCell key={i} className="py-3">
                        <span className="font-display font-black text-[10px] text-foreground/60 uppercase">{hourLabel(h.local_hour)}</span>
                      </GridCell>
                    ))}
                  </div>
                  {/* Wind */}
                  <div className="flex border-b border-black/08 bg-white">
                    {hourly.map((h, i) => {
                      const { cell, text } = windColor(Math.round(h.wind_avg));
                      return (
                        <GridCell key={i} className={`py-4 ${cell}`}>
                          <span className={`font-display font-black text-sm leading-none ${text}`}>{Math.round(h.wind_avg)}</span>
                        </GridCell>
                      );
                    })}
                  </div>
                  {/* Direction */}
                  <div className="flex border-b border-black/08 bg-black/[0.02]">
                    {hourly.map((h, i) => (
                      <GridCell key={i} className="py-3">
                        <ArrowUp className="w-3.5 h-3.5" style={{ color: CYAN, transform: `rotate(${h.wind_direction + 180}deg)` }} />
                        <span className="font-display font-black text-[8px] text-foreground/50 mt-0.5 uppercase">{h.wind_direction_cardinal}</span>
                      </GridCell>
                    ))}
                  </div>
                  {/* Gust */}
                  <div className="flex border-b border-black/08 bg-white">
                    {hourly.map((h, i) => {
                      const { cell, text } = gustColor(Math.round(h.wind_gust));
                      return (
                        <GridCell key={i} className={`py-4 ${cell}`}>
                          <span className={`font-display font-black text-sm leading-none ${text}`}>{Math.round(h.wind_gust)}</span>
                        </GridCell>
                      );
                    })}
                  </div>
                  {/* Sky */}
                  <div className="flex border-b border-black/08 bg-black/[0.02]">
                    {hourly.map((h, i) => (
                      <GridCell key={i} className="py-3">
                        <span style={{ fontSize: 15, lineHeight: 1 }}>{wxIcon(h.icon)}</span>
                      </GridCell>
                    ))}
                  </div>
                  {/* Temp */}
                  <div className="flex bg-white">
                    {hourly.map((h, i) => {
                      const { cell, text } = tempColor(Math.round(h.air_temperature));
                      return (
                        <GridCell key={i} className={`py-4 ${cell}`}>
                          <span className={`font-display font-black text-sm leading-none ${text}`}>{Math.round(h.air_temperature)}</span>
                        </GridCell>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <p className="font-display font-black text-foreground/30 text-[10px] uppercase tracking-widest">
              Tempest station 209895 · Atlantis Beach · Active 9AM–5PM daily · Refreshes every 5 min
            </p>
          </motion.div>

          {/* ── DESKTOP: 7-DAY ───────────────────────────────────────────────── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="hidden md:block mb-12"
          >
            <p className="category-label mb-2">Planning Ahead</p>
            <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(28px,4vw,52px)] leading-[0.9] mb-6">
              7-Day Overview
            </h2>
            <div
              className="grid grid-cols-7 overflow-hidden"
              style={{ borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.08)" }}
            >
              {dailyWithWind.map((d, i) => {
                const { cell, text } = d.hasData ? windColor(d.wind_avg) : { cell: "bg-black/[0.03]", text: "text-foreground/20" };
                return (
                  <div
                    key={i}
                    className="text-center"
                    style={{ borderRight: i < dailyWithWind.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
                  >
                    <div className="py-3 px-1 border-b border-black/10" style={{ background: OCEAN_DEEP }}>
                      <p className="font-display font-black text-[10px] md:text-xs uppercase tracking-widest text-white">
                        {shortDay(d.day_start_local)}
                      </p>
                    </div>
                    <div className="p-2 md:p-3" style={{ background: SAND }}>
                      <span style={{ fontSize: 18, lineHeight: 1 }}>{wxIcon(d.icon)}</span>
                      <div className={`mt-2 py-2 px-1 ${cell}`} style={{ borderRadius: 6 }}>
                        {d.hasData ? (
                          <>
                            <p className={`font-display font-black text-base md:text-lg leading-none ${text}`}>{d.wind_avg}</p>
                            <p className={`font-display font-black text-[9px] mt-0.5 uppercase opacity-70 ${text}`}>kts</p>
                          </>
                        ) : (
                          <p className="font-display font-black text-[9px] text-foreground/20 uppercase py-1">—</p>
                        )}
                      </div>
                      <p className="font-display font-black text-foreground/40 text-[9px] uppercase tracking-wide mt-2">
                        {Math.round(d.air_temp_high)}°/{Math.round(d.air_temp_low)}°
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="font-display font-black text-foreground/30 text-[10px] uppercase tracking-widest mt-3">
              Daily avg derived from hourly forecast data
            </p>
          </motion.div>

          {/* ── EXTERNAL LINKS ───────────────────────────────────────────────── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mt-4"
          >
            <p className="category-label mb-2">Want more depth?</p>
            <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(28px,4vw,52px)] leading-[0.9] mb-6">
              Check the Full Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { tag: "Best for planning", title: "Windguru", desc: "Hourly model data pinned to Atlantis Beach. Best for planning sessions 1–3 days out.", href: "https://www.windguru.cz/209061",         cta: "Open Windguru", primary: false },
                { tag: "Regional picture",  title: "Windy",    desc: "Animated regional wind map centred on Bonaire. See the full Caribbean picture.",        href: "https://www.windy.com/12.066/-68.282",  cta: "Open Windy",    primary: false },
                { tag: "Our station",       title: "Tempest",  desc: "Live sensor data direct from Atlantis Beach. The most accurate local reading.",          href: "https://tempestwx.com/station/209895/", cta: "Open Tempest",  primary: true  },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between gap-6 p-6 md:p-8"
                  style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}
                >
                  <div>
                    <p className="category-label mb-3">{s.tag}</p>
                    <h3 className="font-display font-black text-foreground uppercase tracking-tighter text-2xl leading-tight mb-3">{s.title}</h3>
                    <p className="font-body text-foreground/60 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                    className={s.primary ? "btn-cyan self-start" : "btn-outline-dark self-start"}>
                    {s.cta}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      )}
    </div>
  );
}
