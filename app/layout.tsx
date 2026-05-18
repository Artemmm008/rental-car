import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Car Service",
  description: "Rent your dream car!",
};

const manrope = Manrope({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-manrope', 
  display: 'swap', 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
          </main>
        </TanStackProvider>
        <Toaster />
      </body>
    </html>
  );
}
