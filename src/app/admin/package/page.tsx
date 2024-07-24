import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getAllPackage } from '@/lib/data'

import { PackageTable } from '@/components/package/PackageTable'



const page = async () => {

    const packagelist = await getAllPackage()

  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            
            </div>

            <TabsContent value="all">
            <PackageTable packagelist={packagelist}/>
            </TabsContent>

          </Tabs>
    </main>
  )
}

export default page;