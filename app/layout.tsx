import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import {auth} from "@/auth"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Home",
  description: "Online Booking Hotel",
};

export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${raleway.variable}  antialiased`}>
          <SessionProvider session={session}>
          <Navbar />
          <main className="bg-gray-50 min-h-screen">
          {children}
          </main>
          <Footer/>
          </SessionProvider>
      </body>
    </html>
  );
}
