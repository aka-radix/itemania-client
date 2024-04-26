/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "http",
          hostname: "127.0.0.1",
          port: "8000",
          pathname: "/media/items/*"
        }
      ]
    }
};

export default nextConfig;
