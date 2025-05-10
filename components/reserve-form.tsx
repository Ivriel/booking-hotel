"use client";
import { useState,useActionState } from 'react';
import React from 'react'
import { addDays } from 'date-fns';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { createReserve } from '@/lib/actions';
import { RoomDetailProps } from '@/type/room';
import clsx from 'clsx';

function ReserveForm({room}:{room:RoomDetailProps}) {

  const StartDate = new Date()
  const EndDate = addDays(StartDate,1)

  const [startDate,setStartDate] = useState(StartDate)
  const [endDate,setEndDate] = useState(EndDate)
  const handleDateChange= (dates: any) => {
    const [start,end] = dates;
    setStartDate(start);
    setEndDate(end)
  }
  const [state,formAction,isPending] =  useActionState(createReserve.bind(null,room.id,room.price,startDate,endDate),null)
  return (
    <div>
        <form action={formAction}>
            <div className="mb-4">
                <label className='block mb-2 text-sm font-medium text-gray-900'>Arrival - Departure</label>
                <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                selectsRange={true}
                onChange={handleDateChange}
                dateFormat={"dd-MM-YYYY"}
                wrapperClassName='w-full'
                className='py-2 px-4 rounded-md border border-gray-300 w-full'
                />
                <div className="" aria-live='polite' aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.messageDate}</p>
                </div>
            </div>
            <div className="mb-4">
                <label className='block mb-2 text-sm font-medium text-gray-900'>Your Name</label>
                <input type="text" name='name' className='py-2 px-4 rounded-md border border-gray-300 w-full' placeholder='Full Name...' />
                <div className="" aria-live='polite' aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
                </div>
            </div>
            <div className="mb-4">
                <label className='block mb-2 text-sm font-medium text-gray-900'>Phone Number</label>
                <input type="text" name='phone' className='py-2 px-4 rounded-md border border-gray-300 w-full' placeholder='Phone Number...' />
                <div className="" aria-live='polite' aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.phone}</p>
                </div>
            </div>
            <button type='submit' disabled={isPending} className={clsx(" cursor-pointer px-10 py-3 text-center font-semibold text-white w-full bg-orange-400 rounded-sm  hover:bg-orange-500",{
                "opacity-50 cursor-progress":isPending,
            })}>
                {isPending?"Loading...":"Reserve"}
                </button>
        </form>
    </div>
  )
}

export default ReserveForm