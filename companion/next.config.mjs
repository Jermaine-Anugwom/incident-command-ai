const isPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPages ? "/incident-command-ai" : "",
  assetPrefix: isPages ? "/incident-command-ai/" : "",
  images: { unoptimized: true },
};

export default nextConfig;
