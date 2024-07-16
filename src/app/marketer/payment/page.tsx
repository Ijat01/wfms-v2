
import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PaymentList } from '@/components/Payment/paymentlist'
import { getPaymentDataAll, getPaymentList } from '@/lib/data'
import Loading from './loading'




const page = async () => {

  const payments = await getPaymentList();
  const paymentdetails = await getPaymentDataAll();

  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="all">
          <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>

            </div>
            <TabsContent value="all">
            <Suspense fallback={<Loading/>}>
            <PaymentList payments={payments} paymentdetails={paymentdetails}/>
            </Suspense>
            </TabsContent>
          </Tabs>
    </main>
  )
}

export default page;