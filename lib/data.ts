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