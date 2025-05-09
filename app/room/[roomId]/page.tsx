import React from 'react'
import { Metadata } from 'next'
import { Suspense } from 'react'
import RoomDetail from '@/components/room-detail'

export const metadata:Metadata = {
    title:"Room Page"
}

const RoomDetailPage = async ({
    params 
}: {
    params:Promise<{roomId:string}>
}) => {
    const roomId = (await params).roomId;
  return (
    <div className='mt-16'>
        <Suspense fallback={<p>Loading...</p>}>
        <RoomDetail roomId={roomId}/>
        </Suspense>
    </div>
  )
}

export default RoomDetailPage