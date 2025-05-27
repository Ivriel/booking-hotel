import React from 'react'
import Image from 'next/image'
import { getReservationById } from '@/lib/data'
import { formatDate,formatCurrency } from '@/lib/utils'
import { differenceInCalendarDays } from 'date-fns'
import clsx from 'clsx'
import PaymentButton from '@/components/payment-button'

async function CheckoutDetail({reservationId}:{reservationId:string}) {
    const reservation = await getReservationById(reservationId)
    if(!reservation || !reservation.Payment) return <h1> No Reservation Found </h1>
    const duration = differenceInCalendarDays(reservation.endDate,reservation.startDate)
    return (
    <div className='grid md:grid-cols-2 gap-5'>
        <div className="order-2">
            <div className="flex flex-col mb-3 items-start bg-white border border-gray-200 rounded-sm md:flex-row md:w-full">
                <div className="aspect-video relative">
                    <Image src={reservation.Room.image} width={500} height={300} className='object-cover w-full rounded-t-sm aspect-video md:rounded-none md:rounded-s-sm' alt="image"/>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 className='mb-1 text-4xl font-bold tracking-tight text-gray-900'>{reservation.Room.name}</h5>
                    <div className="flex items-center gap-1 text-2xl text-gray-700">
                        <div className="flex items-center justify-center gap-1">
                            <span className='text-2xl'>
                                {formatCurrency(reservation.price)}
                            </span>
                            <span>/ night</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Payment Button*/}
            <PaymentButton reservation={reservation}/>
        </div>
        <div className="border border-gray-200 px-3 py-5 bg-white rounded-sm">
            <table className='w-full'>
                <tbody>
                    <tr>
                        <td className='py-2'>Reservation ID</td>
                        <td className='py-2 text-right truncate'>#{reservation.id}</td>
                    </tr>
                    <tr>
                        <td className='py-2'>Name</td>
                        <td className='py-2 text-right truncate'>{reservation.user.name}</td>
                    </tr>
                    <tr>
                        <td className='py-2'>Email</td>
                        <td className='py-2 text-right truncate'>{reservation.user.email}</td>
                    </tr>
                    <tr>
                        <td className='py-2'>Phone Number</td>
                        <td className='py-2 text-right truncate'>{reservation.user.phone}</td>
                    </tr>
                      <tr>
                        <td className='py-2'>Arrival</td>
                        <td className='py-2 text-right truncate'>{formatDate(reservation.startDate.toISOString())}</td>
                    </tr>
                    <tr>
                        <td className='py-2'>Departure</td>
                        <td className='py-2 text-right truncate'>{formatDate(reservation.endDate.toISOString())}</td>
                    </tr>
                      <tr>
                        <td className='py-2'>Duration</td>
                        <td className='py-2 text-right truncate'>
                            <span>  {duration} {duration <= 1? "Night":"Nights"}</span>
                        </td>
                    </tr> 
                      <tr>
                        <td className='py-2'>Amount in Rupiah</td>
                        <td className='py-2 text-right truncate'>
                            <span>  {formatCurrency(reservation.Payment.amount)}</span>
                        </td>
                    </tr>     
                    <tr>
                        <td className='py-2'>Status</td>
                        <td className='py-2 text-right truncate'>
                         <span className={clsx(
                            "font-medium", // style yang akan selalu ditampilkan baik benar ataupun salah (default class)
                            {
                                "text-green-400 uppercase":reservation.Payment.status === "paid",
                                "text-red-500 uppercase":reservation.Payment.status === "unpaid"
                            }
                         )}>
                            {reservation.Payment.status}
                         </span>
                        </td>
                    </tr>      
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default CheckoutDetail