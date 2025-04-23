import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https", // agar bisa terima user profile image props
        hostname:"lh3.googleusercontent.com"
      },
      {
        protocol:"https",
        hostname:"6g0ddtt9iddn7jbf.public.blob.vercel-storage.com"
      }
    ]
  }
};

export default nextConfig;
