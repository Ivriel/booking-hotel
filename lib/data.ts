import {prisma} from "@/lib/prisma"
import { auth } from "@/auth"

export const getAmenities = async ()=>{
    const session = await auth()
    if(!session||!session.user) {
        throw new Error("Unauthorized Access")
    }
    try {
        const result = await prisma.amenities.findMany();
        return result
    } catch (error) {
        console.log(error)
    }
}


export const getRooms = async ()=>{
    try {
        const result = await prisma.room.findMany({
            orderBy:{
                createdAt:"desc"
            }
        });
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getRoomById = async (roomId:string)=>{ // untuk edit room
    try {
        const result = await prisma.room.findUnique({
            where:{id:roomId},
            include:{RoomAmenities:{select:{amenitiesId:true}}}
        });
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getRoomDetailById = async (roomId:string)=>{ 
    try {
        const result = await prisma.room.findUnique({
            where:{id:roomId},
            include:{
                RoomAmenities:{  
                    include:{
                        Amenities: {
                            select: {
                                name:true,
                            }
                        }
                    }
                }
            }
        })
        return result
    } catch (error) {
        console.error("Error fetching room:"+error)
        return null
    }
}