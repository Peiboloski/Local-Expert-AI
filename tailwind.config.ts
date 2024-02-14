import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "ds-white": "#FFFFFF",
      "ds-black": "#000000",

      "ds-grey-100": "#F8F9FA",
      "ds-grey-200": "#E9ECEF",
      "ds-grey-300": "#DEE2E6",
      "ds-grey-400": "#CED4DA",
      "ds-grey-500": "#ADB5BD",
      "ds-grey-600": "#6C757D",
      "ds-grey-700": "#495057",
      "ds-grey-800": "#343A40",
      "ds-grey-900": "#212529",

      "ds-green-100": "#E1FFF2",
      "ds-green-200": "#CEFDE8",
      "ds-green-300": "#9DFBD1",
      "ds-green-400": "#3CF7A2",
      "ds-green-500": "#00B261",
      "ds-green-800": "#005E33",
      "ds-green-900": "#002C18",
    },
    fontFamily: {
      "space-grotesk": ["--font-space-grotesk", "sans-serif"],
    },
    extend: {
      spacing: {
        "ds-4": "4px",
        "ds-8": "8px",
        "ds-12": "12px",
        "ds-16": "16px",
        "ds-24": "24px",
        "ds-32": "32px",
        "ds-48": "48px",
        "ds-64": "64px",
        "ds-96": "96px",
        "ds-128": "128px",
      },
      fontSize: {
        "ds-12": "12px",
        "ds-14": "14px",
        "ds-16": "16px",
        "ds-18": "18px",
        "ds-20": "20px",
        "ds-24": "24px",
        "ds-30": "30px",
        "ds-36": "36px",
        "ds-48": "48px",
        "ds-60": "60px",
        "ds-72": "72px",
        "ds-80": "80px",
      },
      borderRadius: {
        "ds-4": "4px",
      }
    },
  }
};

export default config;