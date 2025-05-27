import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async headers() {
    return [
      {
        source:"/api/payment/notification/:path*",
        headers: [
          {key:"Access-Control-Allow-Origin",value:"*"}, // replace this with your actual origin
          {key:"Access-Control-Allow-Methods",value:"GET,POST"},
          {key:"Access-Control-Allow-Headers",value:"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type"}
        ]
      }
    ]
  },
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
