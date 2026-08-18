import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Lessons pages
      { source: "/kitesurfing-lessons", destination: "/lessons", permanent: true },
      { source: "/all-lessons-mobile", destination: "/lessons", permanent: true },
      { source: "/kitesurfing-lessons-popular", destination: "/lessons", permanent: true },
      { source: "/beginner-discovery", destination: "/lessons", permanent: true },
      { source: "/beginner-s-lesson-private-booking", destination: "/lessons", permanent: true },
      { source: "/independent-rider", destination: "/lessons", permanent: true },
      { source: "/independent-rider-semi-booking", destination: "/lessons", permanent: true },
      { source: "/independent-rider-private-booking", destination: "/lessons", permanent: true },
      { source: "/independent-plus", destination: "/lessons", permanent: true },
      { source: "/independent-plus-semi-private", destination: "/lessons", permanent: true },
      { source: "/independent-plus-private", destination: "/lessons", permanent: true },
      { source: "/semi-private-lesson-booking", destination: "/lessons", permanent: true },

      // Rentals pages
      { source: "/kitesurfing-rentals", destination: "/rentals", permanent: true },
      { source: "/bookings-mobile", destination: "/rentals", permanent: true },

      // Trips
      { source: "/brazil-kite-safari", destination: "/trips", permanent: true },

      // About and instructor pages
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/carlos-lilue", destination: "/about", permanent: true },
      { source: "/tessa-lof", destination: "/about", permanent: true },
      { source: "/lex-donse", destination: "/about", permanent: true },
      { source: "/rommel-rivas", destination: "/about", permanent: true },
      { source: "/ryan-augusta", destination: "/about", permanent: true },
      { source: "/otto-jansen", destination: "/about", permanent: true },
      { source: "/paco-veeris", destination: "/about", permanent: true },
      { source: "/floor-timmermans", destination: "/about", permanent: true },

      // FAQ
      { source: "/frequently-asked-questions", destination: "/info", permanent: true },
      { source: "/refresh-skills", destination: "/info", permanent: true },

      // Forecast
      { source: "/forecast-bonaire", destination: "/forecast", permanent: true },
      { source: "/live-forecast", destination: "/forecast", permanent: true },

      // Contact and booking forms
      { source: "/contact-us", destination: "/", permanent: true },
      { source: "/book-online", destination: "/", permanent: true },
      { source: "/book-now", destination: "/", permanent: true },
      { source: "/booking-confirmation", destination: "/", permanent: true },
      { source: "/thank-you", destination: "/", permanent: true },

      // Services and special pages
      { source: "/day-pass", destination: "/", permanent: true },
      { source: "/hydrofoil-landing-page", destination: "/", permanent: true },
      { source: "/stay-bonaire", destination: "/", permanent: true },
      { source: "/kitesurfing-photoshoot", destination: "/", permanent: true },
      { source: "/advertise-with-kiteboarding-bonaire", destination: "/", permanent: true },
      { source: "/kitesurfing-instructors", destination: "/about", permanent: true },
      { source: "/survey-kbb", destination: "/", permanent: true },
      { source: "/videos", destination: "/", permanent: true },
      { source: "/copy-of-kitesurfing-lessons-old", destination: "/lessons", permanent: true },
    ];
  },
};

export default nextConfig;
