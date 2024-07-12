
import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PaymentList } from '@/components/Marketer/payment/paymentlist'
import { getBookingTaskDataAll, getPaymentDataAll, getPaymentList } from '@/lib/data'





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
            <PaymentList payments={payments} paymentdetails={paymentdetails}/>
            </TabsContent>
          </Tabs>
    </main>
  )
}

export default page;