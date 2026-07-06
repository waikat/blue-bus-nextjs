import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kiteboarding Bonaire — The Blue Bus",
    short_name: "KBB Wind",
    description:
      "Live wind forecast and kiteboarding conditions at Atlantis Beach, Bonaire.",
    start_url: "/forecast",
    display: "standalone",
    background_color: "#082d54",
    theme_color: "#0e4c8a",
    orientation: "portrait",
    categories: ["sports", "weather"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
