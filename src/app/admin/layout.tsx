import { Navbar } from "@/components/Navbar";
import TopBar from "@/components/Topbar";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "../providers";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className="">
    <div className=" flex min-h-screen w-full flex-col bg-muted/40">
    <Navbar/>
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <TopBar/>
    
    
    <Providers>{children}</Providers>
    
    </div>
    </div> 
    <Toaster/>
    </body>
    </html>
  );
}