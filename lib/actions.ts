"use server";
import { ContactSchema, RoomSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const saveRoom = async (image: string, prevState: unknown, formData: FormData) => {
    if (!image) return { // jika tidak ada image 
        message: "Image is required"
    }
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        capacity: formData.get("capacity"),
        price: formData.get("price"),
        amenities: formData.getAll("amenities")
    }
    const validatedFields = RoomSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    const { name, description, price, capacity, amenities } = validatedFields.data
    try {
        await prisma.room.create({
            data: {
                name,
                description,
                image,
                price,
                capacity,
                RoomAmenities: {
                    createMany: {
                        data: amenities.map((item) => ({
                            amenitiesId: item
                        }))
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
    redirect("/admin/room")
}

export const ContactMessage = async (prevState: unknown, formdata: FormData) => {
    const validatedFields = ContactSchema.safeParse(Object.fromEntries(formdata.entries()))

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }
    const { name, email, subject, message } = validatedFields.data;
    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message
            }
        });
        return { message: "Thanks for contact us" }
    } catch (error) {
        console.log(error)
    }
}

// Delete Room
export const deleteRoom = async (id: string, image: string) => {
    try {
        await del(image)
        await prisma.room.delete({
            where: { id }
        })
    } catch (error) {
        console.log(error)
    }
    revalidatePath("/admin/room")
}

// Update Room

export const updateRoom = async (image: string, roomId:string, prevState: unknown, formData: FormData) => {
    if (!image) return { // jika tidak ada image 
        message: "Image is required"
    }
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        capacity: formData.get("capacity"),
        price: formData.get("price"),
        amenities: formData.getAll("amenities")
    }
    const validatedFields = RoomSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    const { name, description, price, capacity, amenities } = validatedFields.data
    try {
       await prisma.$transaction([
        prisma.room.update({
            where:{id:roomId},
            data:{
                name,
                description,
                image,
                price,
                capacity,
                RoomAmenities:{
                    deleteMany:{}
                }
            }
        }),
        prisma.roomAmenities.createMany({
            data:amenities.map((item)=>({
                roomId,
                amenitiesId:item
            }))
        })
       ])
    } catch (error) {
        console.log(error)
    }
    revalidatePath("/admin/room")
    redirect("/admin/room")
}