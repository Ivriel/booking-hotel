import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https", // agar bisa terima user profile image props
        hostname:"lh3.googleusercontent.com"
      }
    ]
  }
};

export default nextConfig;
