import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/store/StoreProvider";
import Header from "@/components/ui/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WishlistDrawer from "@/components/store/WishlistDrawer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khata Kolom Shop",
  description: "Premium stationery, fountain pens, and study planners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#FDFBF7] text-[#1F2937] font-sans flex flex-col">
        <StoreProvider>
          <Header />
          <CartDrawer />
          <WishlistDrawer />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ToastContainer position="top-center" />
        </StoreProvider>
      </body>
    </html>
  );
}
