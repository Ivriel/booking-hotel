"use server";
import { SubscribeSchema } from "@/lib/zod2";
import { prisma } from "@/lib/prisma";

export const subscribeNewsletter = async (prevState:unknown, formdata:FormData)=> {
    const validatedFields = SubscribeSchema.safeParse(Object.fromEntries(formdata.entries()))

    if(!validatedFields.success) {
        return {error:validatedFields.error.flatten().fieldErrors};
    }
    const {email} = validatedFields.data;
    try {
        await prisma.subscribe.create({
            data:{
                email,
            }
        }); 
        return {message:"Thanks for subscribe us"}
    } catch (error) {
        console.log(error)
    }
}