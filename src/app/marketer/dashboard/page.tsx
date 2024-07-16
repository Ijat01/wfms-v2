import React, { Suspense } from 'react'
import { DashboardTable } from '@/components/Marketer/DashboardTable'
import { DashboardAlertCard } from '@/components/dashboard/DashboardAlertCard'
import MyTaskCard from '@/components/dashboard/MyTaskCard'
import Loading from './loading'

const page = () => {
  
  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
    <div className=" grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className=" grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3">
            <Suspense fallback={<Loading/>}>
              <DashboardAlertCard/>
            </Suspense> 
            </div>
            <Suspense fallback={<Loading/>}>
            <DashboardTable/>
            </Suspense>
            
    </div>
    <Suspense fallback={<Loading/>}>
    <MyTaskCard/>
    </Suspense>
  </main>
  )
}

export default page