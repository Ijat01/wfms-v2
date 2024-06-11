import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center">

    <Button>
     <Link href="/admin/dashboard">
     Dashboard
     </Link>
    </Button> 
     

    </div>
  )
}
