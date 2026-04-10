import { Wind } from "lucide-react";
import { useLiveWind } from "@/hooks/useLiveWind";

interface WindWidgetProps {
  onClick?: () => void;
}

export default function WindWidget({ onClick }: WindWidgetProps) {
  const { speed, gust, directionText, isLoading, error } = useLiveWind();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm font-body font-medium">
        <Wind className="w-4 h-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  // Station offline - show message with click handler
  if (error) {
    return (
      <button 
        onClick={onClick}
        className="flex items-center gap-2 text-sm font-body font-medium hover:text-accent transition-colors cursor-pointer"
      >
        <Wind className="w-4 h-4 opacity-50" />
        <span>Wind Station Sleeping</span>
      </button>
    );
  }

  // Show live data when available (clickable too)
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm font-body font-medium hover:text-accent transition-colors cursor-pointer"
    >
      <Wind className="w-4 h-4" />
      <span className="font-bold">{speed} kts</span>
      <span className="text-xs opacity-70">{directionText}</span>
      {gust > speed + 3 && (
        <span className="text-xs opacity-70">→ {gust}</span>
      )}
    </button>
  );
}