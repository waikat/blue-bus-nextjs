import { useState, useEffect } from "react";

// ─── CONFIG — must match WeatherModal.tsx ─────────────────────────────────────
const STATION_ID = "209895";
const TOKEN      = "146dcf5f-6c5e-4668-a157-e0a082a9f24f"; // same token as WeatherModal.tsx
// ─────────────────────────────────────────────────────────────────────────────

// Using better_forecast because it returns current_conditions as named fields.
// The observations/station endpoint returns a compact array — not named fields —
// which is why the previous version always read undefined and showed 0 kts.
const API_URL = `https://swd.weatherflow.com/swd/rest/better_forecast?station_id=${STATION_ID}&token=${TOKEN}&units_wind=kts&units_temp=c&units_pressure=mb`;

interface WindData {
  speed: number;
  gust: number;
  direction: number;
  directionText: string;
  isLoading: boolean;
  error: string | null;
}

export const useLiveWind = (): WindData => {
  const [windData, setWindData] = useState<WindData>({
    speed:         0,
    gust:          0,
    direction:     0,
    directionText: "",
    isLoading:     true,
    error:         null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchWind = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();

        // better_forecast returns current_conditions as a named object
        const cur = json?.current_conditions;
        if (!cur) throw new Error("No current conditions in response");

        if (!cancelled) {
          setWindData({
            speed:         Math.round(cur.wind_avg      ?? 0),
            gust:          Math.round(cur.wind_gust     ?? 0),
            direction:     Math.round(cur.wind_direction ?? 0),
            directionText: cur.wind_direction_cardinal   ?? "",
            isLoading:     false,
            error:         null,
          });
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setWindData(prev => ({
            ...prev,
            isLoading: false,
            error: e instanceof Error ? e.message : "Station offline",
          }));
        }
      }
    };

    fetchWind();
    // Tempest updates every minute — refresh every 2 min is polite
    const id = setInterval(fetchWind, 2 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return windData;
};
