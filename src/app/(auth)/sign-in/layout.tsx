import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <div className="h-screen grid grid-cols-3 grid-rows-3 items-center justify-center">

        {children}  

        </div>

      <Toaster/>
      </body>
    </html>
  );
}