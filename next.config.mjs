import pwa from "next-pwa";

// @ts-check
import { env } from "./src/env/server.mjs";
import transpileModules from "next-transpile-modules";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}


const withTM = transpileModules(['buttplug']);
const withPWA = pwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: new RegExp('.*wasm'),
      handler: 'NetworkFirst',
    }
  ],
  skipWaiting: true,
})

export default defineNextConfig(withPWA(withTM({
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    config.experiments.syncWebAssembly = true;
    return config;
  }
})));
