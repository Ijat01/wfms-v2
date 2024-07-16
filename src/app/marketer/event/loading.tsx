import { Skeleton } from "@/components/ui/skeleton"

export default function Loading(){

    return(
    <div className="grid grid-cols-auto grid-rows-auto space-y-3 justify-center items-center ">
      <Skeleton className="grid items-center justify-center h-[30px] w-[120px] rounded-xl text-center" >

            Loading...

      </Skeleton>
     
    </div>
    )
}