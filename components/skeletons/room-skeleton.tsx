import React from 'react'
import CardSkeleton from '@/components/skeletons/card-skeleton'

function RoomSkeleton() {
  return (
    <div className='max-w-screen-xl py-6 pb-20 px-4 mx-auto'>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    </div>
  )
}

export default RoomSkeleton