import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  
  return (
    <div className="">

    <Button>
     <Link href="/admin/dashboard">
     Dashboard
     </Link>
    </Button> 
     

    </div>
  )
}
