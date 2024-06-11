
import { DashboardTable } from '@/components/DashboardTable'
import { DashboardAlertCard } from '@/components/DashboardAlertCard'
import React from 'react'
import MyTaskCard from '@/components/MyTaskCard'

const page = () => {
  return (
  <>
    <div className=" grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className=" grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              
              <DashboardAlertCard/>
              
            </div>
            <DashboardTable/>
            
    </div>
    <MyTaskCard/>
  </>
  )
}

export default page