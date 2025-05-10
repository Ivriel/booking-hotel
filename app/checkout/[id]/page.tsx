import React from 'react'
import CheckoutDetail from '@/components/checkout-detail'
import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title:"Reservation Summary"
}

async function CheckoutPage({params}:{params:Promise<{id:string}>}) {
  const reservationId = (await params).id

  return (
    <div className='max-w-screen-xl px-4 mx-auto py-20 mt-12'>
      <h1 className='text-2xl font-semibold mb-8'>Reservation Summary</h1>
      <Suspense fallback={<p>Loading...</p>}>
      <CheckoutDetail reservationId={reservationId}/>
      </Suspense>
    </div>
  )
}

export default CheckoutPage 