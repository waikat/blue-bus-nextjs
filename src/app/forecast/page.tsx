"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUp, RefreshCw, Wind, Moon } from "lucide-react";

const STATION_ID = "209895";
const TOKEN      = "146dcf5f-6c5e-4668-a157-e0a082a9f24f";
const API_URL    = `https://swd.weatherflow.com/swd/rest/better_forecast?station_id=${STATION_ID}&token=${TOKEN}&units_wind=kts&units_temp=c&units_pressure=mb&units_precip=mm&units_distance=km`;

const NAVY_DEEP = "hsl(211,100%,12%)";
const NAVY_MID  = "hsl(211,100%,16%)";
const CELL_W    = 56;
const LABEL_W   = 96;

const fadeUp  = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

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

// Station is considered offline only when the API call itself fails (error state).
// We do NOT check cur.time — the better_forecast endpoint's time field is the
// forecast model run time, not the last sensor reading. It always appears stale.
// useLiveWind (header) uses the same API with no time check and works correctly.

// ── Colour scale ──────────────────────────────────────────────────────────────
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

// ── Helpers ───────────────────────────────────────────────────────────────────
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

// ── Grid ──────────────────────────────────────────────────────────────────────
// Label column is rendered separately (fixed left), cells go into shared scroll container
function GridRowLabel({ label, sub, dark }: { label: string; sub?: string; dark?: boolean }) {
  return (
    <div className={`flex flex-col justify-center flex-shrink-0 px-3 border-r-2 border-b-2 border-foreground ${dark ? "bg-foreground/[0.03]" : "bg-white"}`} style={{ width: LABEL_W, minWidth: LABEL_W, height: sub ? 56 : 48 }}>
      <span className="font-display font-black text-[11px] uppercase tracking-widest text-foreground leading-tight">{label}</span>
      {sub && <span className="font-display font-black text-[9px] text-foreground/50 mt-0.5">{sub}</span>}
    </div>
  );
}
function GridCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex-shrink-0 flex flex-col items-center justify-center text-center border-r border-foreground/20 ${className}`} style={{ width: CELL_W, minWidth: CELL_W }}>
      {children}
    </div>
  );
}

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
          <div className="w-4 h-4 flex-shrink-0" style={{ backgroundColor: item.hex }} />
          <span className="font-display font-black text-[11px] uppercase tracking-wide text-foreground">{item.label}</span>
          <span className="font-body text-[10px] text-foreground/40">{item.range}</span>
        </div>
      ))}
    </div>
  );
}

// ── Station Offline ───────────────────────────────────────────────────────────
function StationOffline() {
  return (
    <div className="min-h-screen bg-white">
      <section style={{ background: NAVY_DEEP }} className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="category-label text-accent mb-4">Atlantis Beach · Bonaire</p>
          <h1 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(48px,8vw,120px)] leading-[0.95]">
            Wind<br />Forecast
          </h1>
        </div>
      </section>

      <section style={{ background: NAVY_MID }} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-20 pb-20 border-b border-white/10">
            <div>
              <div className="w-16 h-16 border-2 border-white/20 flex items-center justify-center mb-8">
                <Moon className="w-8 h-8 text-accent" />
              </div>
              <p className="category-label text-accent mb-4">Station offline</p>
              <h2 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(36px,6vw,80px)] leading-[0.9] mb-6">
                Wind Station<br />Sleeping
              </h2>
            </div>
            <div>
              <p className="text-white/70 font-body text-lg leading-relaxed mb-4">
                Our Tempest station at Atlantis Beach runs daily from 9AM to 5PM Bonaire time.
              </p>
              <p className="text-white/70 font-body text-base leading-relaxed">
                For wind data right now, check Windguru or Windy below — both pinned to Atlantis Beach.
              </p>
            </div>
          </div>
          <p className="category-label text-accent mb-6">Check the wind now</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-white/20">
            {[
              { title: "Windguru", desc: "Hourly model data for Atlantis Beach. Best for planning your next session.", href: "https://www.windguru.cz/209061",         cta: "Open Windguru", btn: "btn-outline-white" },
              { title: "Windy",    desc: "Animated wind map centered on Bonaire. See the full regional picture.",     href: "https://www.windy.com/12.066/-68.282",  cta: "Open Windy",    btn: "btn-outline-white" },
              { title: "Tempest",  desc: "Live station data direct from Atlantis Beach. Back online at 9AM.",        href: "https://tempestwx.com/station/209895/", cta: "Open Tempest",  btn: "btn-cyan"         },
            ].map((s, i) => (
              <div key={i} className={`p-8 md:p-10 flex flex-col justify-between gap-6 ${i > 0 ? "border-t-2 md:border-t-0 md:border-l-2 border-white/20" : ""}`}>
                <div>
                  <h3 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(24px,3vw,40px)] leading-[0.95] mb-3">{s.title}</h3>
                  <p className="text-white/70 font-body text-sm leading-relaxed">{s.desc}</p>
                </div>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${s.btn} text-sm self-start`}>{s.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
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

  const cur            = data?.current_conditions;
  const hourly         = data?.forecast?.hourly?.slice(0, 96) ?? [];
  const daily          = data?.forecast?.daily?.slice(0, 7)   ?? [];
  const stationOffline = !cur;

  if (!loading && data && stationOffline) return <StationOffline />;

  const dailyWithWind = buildDailyFromHourly(daily, hourly);

  // Build day groups from hourly data directly.
  // We find the first hourly entry for each day and reconstruct its date
  // by using today's date + offset — no dependency on the daily array.
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const dayGroups: { day: number; count: number; epoch: number }[] = [];
  hourly.forEach((h) => {
    const last = dayGroups[dayGroups.length - 1];
    if (last && last.day === h.local_day) {
      last.count++;
    } else {
      // Find epoch from daily array first, fall back to computing from today
      const matchDaily = daily.find((d) => new Date(d.day_start_local * 1000).getDate() === h.local_day);
      let epoch = matchDaily?.day_start_local ?? 0;
      if (!epoch) {
        // Compute: find how many days ahead this local_day is from today
        const todayDay = todayDate.getDate();
        let dayOffset = h.local_day - todayDay;
        if (dayOffset < 0) dayOffset += 31; // month wrap
        const d = new Date(todayDate);
        d.setDate(todayDate.getDate() + dayOffset);
        epoch = Math.floor(d.getTime() / 1000);
      }
      dayGroups.push({ day: h.local_day, count: 1, epoch });
    }
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section style={{ background: NAVY_DEEP }} className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="category-label text-accent mb-4">Atlantis Beach · Bonaire</p>
              <h1 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(48px,8vw,120px)] leading-[0.95]">
                Wind<br />Forecast
              </h1>
            </div>
            <div className="flex items-center gap-3 pb-2">
              {lastUpdated && (
                <span className="text-white/50 font-display font-black text-xs uppercase tracking-widest">
                  Updated {lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <button onClick={fetchData} disabled={loading} className="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:border-accent transition-colors disabled:opacity-40" aria-label="Refresh">
                <RefreshCw className={`w-4 h-4 text-white/60 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOADING ── */}
      {loading && !data && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="font-display font-black text-foreground/40 text-sm uppercase tracking-widest">Loading forecast...</p>
        </div>
      )}

      {data && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── CURRENT CONDITIONS ── */}
          {cur && (
            <motion.div initial="hidden" animate="visible" variants={stagger}
              className="border-b-2 border-foreground py-12 md:py-16">

              <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">

                {/* Left — big wind number on dark background */}
                <div className="p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-foreground flex flex-col justify-between gap-8" style={{ background: NAVY_DEEP }}>
                  <p className="category-label text-accent">Live Wind · Right Now</p>
                  <div>
                    <div className="flex items-end gap-4 mb-3">
                      <span className="font-display font-black leading-none" style={{ fontSize: "clamp(80px,14vw,160px)", color: windHex(Math.round(cur.wind_avg)) }}>
                        {Math.round(cur.wind_avg)}
                      </span>
                      <span className="font-display font-black text-white/40 text-3xl pb-4">kts</span>
                    </div>
                    <p className="font-display font-black text-white/50 text-sm uppercase tracking-widest">
                      Gusting {Math.round(cur.wind_gust)} kts
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div>
                    <div className="h-2 bg-white/10 w-full">
                      <div className="h-full transition-all duration-700" style={{ width: `${Math.min(100, (cur.wind_avg / 35) * 100)}%`, backgroundColor: windHex(Math.round(cur.wind_avg)) }} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="font-display font-black text-[10px] text-white/30 uppercase tracking-widest">0</span>
                      <span className="font-display font-black text-[10px] text-white/30 uppercase tracking-widest">35 kts</span>
                    </div>
                  </div>
                </div>

                {/* Right — condition + direction + temp */}
                <div className="grid grid-cols-1 divide-y-2 divide-foreground">
                  {/* Condition label */}
                  <div className="p-6 md:p-8 flex flex-col justify-between gap-2">
                    <p className="category-label">Conditions</p>
                    <p className="font-display font-black uppercase tracking-tighter leading-none"
                      style={{ fontSize: "clamp(40px,6vw,72px)", color: windHex(Math.round(cur.wind_avg)) }}>
                      {windLabel(cur.wind_avg)}
                    </p>
                    <p className="font-body text-foreground/50 text-sm">{cur.conditions}</p>
                  </div>
                  {/* Direction + Temp */}
                  <div className="grid grid-cols-2 divide-x-2 divide-foreground">
                    <div className="p-6 md:p-8">
                      <p className="category-label mb-4">Direction</p>
                      <div className="flex items-center gap-3">
                        <ArrowUp className="w-8 h-8 text-accent flex-shrink-0" style={{ transform: `rotate(${cur.wind_direction + 180}deg)` }} />
                        <span className="font-display font-black text-foreground uppercase tracking-tighter" style={{ fontSize: "clamp(32px,4vw,52px)" }}>
                          {cur.wind_direction_cardinal}
                        </span>
                      </div>
                      <p className="font-display font-black text-foreground/40 text-xs uppercase tracking-widest mt-2">{cur.wind_direction}°</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="category-label mb-4">Temp</p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-black text-foreground leading-none" style={{ fontSize: "clamp(32px,4vw,52px)" }}>
                          {Math.round(cur.air_temperature)}
                        </span>
                        <span className="font-display font-black text-foreground/40 text-xl">°C</span>
                      </div>
                      <p className="font-body text-foreground/40 text-xs mt-2">{wxIcon(cur.icon)} {cur.conditions}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── HOURLY GRID — desktop only ── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="hidden md:block py-12 md:py-16">

            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="category-label mb-3">96-Hour Breakdown</p>
                <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(32px,5vw,64px)] leading-[0.9]">
                  Hour by Hour
                </h2>
              </div>
              <Legend />
            </motion.div>

            <motion.div variants={fadeUp} className="border-2 border-foreground overflow-hidden mb-4">
              {/* Two-column layout: fixed labels left, single scroll container right */}
              <div className="flex">

                {/* LEFT — fixed label column */}
                <div className="flex-shrink-0 flex flex-col" style={{ width: LABEL_W, minWidth: LABEL_W }}>
                  {/* Day header spacer */}
                  <div className="border-b-2 border-r-2 border-foreground flex-shrink-0" style={{ background: NAVY_DEEP, height: 44 }} />
                  <GridRowLabel label="Hour" dark />
                  <GridRowLabel label="Wind" sub="kts" />
                  <GridRowLabel label="Dir" dark />
                  <GridRowLabel label="Gust" sub="kts" />
                  <GridRowLabel label="Sky" dark />
                  <GridRowLabel label="Temp" sub="°C" />
                </div>

                {/* RIGHT — single scroll container, all rows lock-scroll together */}
                <div className="flex-1 overflow-x-auto hide-scrollbar">

                  {/* Day headers */}
                  <div className="flex border-b-2 border-foreground" style={{ background: NAVY_DEEP, height: 44 }}>
                    {dayGroups.map((group, i) => (
                      <div key={i} className="flex-shrink-0 flex items-center px-3 border-l-2 border-accent/50" style={{ width: group.count * CELL_W, minWidth: group.count * CELL_W }}>
                        <span className="font-display font-black text-xs uppercase tracking-widest text-white whitespace-nowrap">
                          {fullDay(group.epoch)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hour row */}
                  <div className="flex border-b-2 border-foreground bg-foreground/[0.03]">
                    {hourly.map((h, i) => (
                      <GridCell key={i} className="py-3">
                        <span className="font-display font-black text-[10px] text-foreground uppercase">{hourLabel(h.local_hour)}</span>
                      </GridCell>
                    ))}
                  </div>

                  {/* Wind row */}
                  <div className="flex border-b-2 border-foreground bg-white">
                    {hourly.map((h, i) => {
                      const { cell, text } = windColor(Math.round(h.wind_avg));
                      return (
                        <GridCell key={i} className={`py-4 ${cell}`}>
                          <span className={`font-display font-black text-sm leading-none ${text}`}>{Math.round(h.wind_avg)}</span>
                        </GridCell>
                      );
                    })}
                  </div>

                  {/* Dir row */}
                  <div className="flex border-b-2 border-foreground bg-foreground/[0.03]">
                    {hourly.map((h, i) => (
                      <GridCell key={i} className="py-3">
                        <ArrowUp className="w-3.5 h-3.5 text-accent" style={{ transform: `rotate(${h.wind_direction + 180}deg)` }} />
                        <span className="font-display font-black text-[8px] text-foreground/60 mt-0.5 uppercase">{h.wind_direction_cardinal}</span>
                      </GridCell>
                    ))}
                  </div>

                  {/* Gust row */}
                  <div className="flex border-b-2 border-foreground bg-white">
                    {hourly.map((h, i) => {
                      const { cell, text } = gustColor(Math.round(h.wind_gust));
                      return (
                        <GridCell key={i} className={`py-4 ${cell}`}>
                          <span className={`font-display font-black text-sm leading-none ${text}`}>{Math.round(h.wind_gust)}</span>
                        </GridCell>
                      );
                    })}
                  </div>

                  {/* Sky row */}
                  <div className="flex border-b-2 border-foreground bg-foreground/[0.03]">
                    {hourly.map((h, i) => (
                      <GridCell key={i} className="py-3">
                        <span style={{ fontSize: 15, lineHeight: 1 }}>{wxIcon(h.icon)}</span>
                      </GridCell>
                    ))}
                  </div>

                  {/* Temp row */}
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
            </motion.div>

            <p className="font-display font-black text-foreground/40 text-[10px] uppercase tracking-widest">
              Tempest station 209895 · Atlantis Beach · Active 9AM–5PM daily · Refreshes every 5 min
            </p>
          </motion.div>

          {/* ── 7-DAY — desktop only ── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="hidden md:block py-12 md:py-16 border-t-2 border-foreground">

            <motion.div variants={fadeUp} className="mb-8">
              <p className="category-label mb-3">Planning Ahead</p>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(32px,5vw,64px)] leading-[0.9]">
                7-Day Overview
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-7 gap-0 border-2 border-foreground mb-3">
              {dailyWithWind.map((d, i) => {
                const { cell, text } = d.hasData ? windColor(d.wind_avg) : { cell: "bg-foreground/5", text: "text-foreground/20" };
                return (
                  <div key={i} className={`text-center ${i < dailyWithWind.length - 1 ? "border-r-2 border-foreground" : ""}`}>
                    <div className="py-3 px-1 border-b-2 border-foreground" style={{ background: NAVY_DEEP }}>
                      <p className="font-display font-black text-[10px] md:text-xs uppercase tracking-widest text-white">
                        {shortDay(d.day_start_local)}
                      </p>
                    </div>
                    <div className="p-2 md:p-3">
                      <span style={{ fontSize: 18, lineHeight: 1 }}>{wxIcon(d.icon)}</span>
                      <div className={`mt-2 py-2 px-1 ${cell}`}>
                        {d.hasData ? (
                          <>
                            <p className={`font-display font-black text-base md:text-lg leading-none ${text}`}>{d.wind_avg}</p>
                            <p className={`font-display font-black text-[9px] mt-0.5 uppercase ${text} opacity-70`}>kts</p>
                          </>
                        ) : (
                          <p className="font-display font-black text-[9px] text-foreground/20 uppercase py-1">—</p>
                        )}
                      </div>
                      <p className="font-display font-black text-foreground/40 text-[9px] uppercase tracking-wide mt-2">
                        {Math.round(d.air_temp_high)}° / {Math.round(d.air_temp_low)}°
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
            <p className="font-display font-black text-foreground/40 text-[10px] uppercase tracking-widest">
              Daily avg derived from hourly forecast data
            </p>
          </motion.div>

          {/* ── EXTERNAL LINKS ── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="py-12 md:py-20 border-t-2 border-foreground">

            <motion.div variants={fadeUp} className="mb-10">
              <p className="category-label mb-3">Want more depth?</p>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(32px,5vw,64px)] leading-[0.9]">
                Check the Full Models
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-foreground">
              {[
                { tag: "Best for planning",    title: "Windguru",  desc: "Hourly model data pinned to Atlantis Beach. Best for planning sessions 1–3 days out.", href: "https://www.windguru.cz/209061",         cta: "Open Windguru", btn: "btn-outline-dark" },
                { tag: "Regional picture",     title: "Windy",     desc: "Animated regional wind map centred on Bonaire. See the full Caribbean picture.",        href: "https://www.windy.com/12.066/-68.282",  cta: "Open Windy",    btn: "btn-outline-dark" },
                { tag: "Our station",          title: "Tempest",   desc: "Live sensor data direct from Atlantis Beach. The most accurate local reading.",          href: "https://tempestwx.com/station/209895/", cta: "Open Tempest",  btn: "btn-cyan"        },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp}
                  className={`p-8 md:p-10 flex flex-col justify-between gap-8 ${i > 0 ? "border-t-2 md:border-t-0 md:border-l-2 border-foreground" : ""}`}>
                  <div>
                    <p className="category-label mb-3">{s.tag}</p>
                    <h3 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(28px,3vw,48px)] leading-[0.9] mb-4">{s.title}</h3>
                    <p className="font-body text-foreground/60 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${s.btn} text-sm self-start`}>{s.cta}</a>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      )}
    </div>
  );
}
