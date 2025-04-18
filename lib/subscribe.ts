"use server";
import { SubscribeSchema } from "@/lib/zod2";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const subscribeNewsletter = async (prevState:unknown, formdata:FormData)=> {
    const validatedFields = SubscribeSchema.safeParse(Object.fromEntries(formdata.entries()))

    if(!validatedFields.success) {
        return {error:validatedFields.error.flatten().fieldErrors};
    }
    const {email} = validatedFields.data;
     try {
        // Check if email already exists
        const existingSubscription = await prisma.subscribe.findFirst({
            where: {
                email: email
            }
        });

        if (existingSubscription) {
            return {
                error: {
                    email: ["This email is already subscribed!"]
                }
            };
        }

        // If email doesn't exist, create new subscription
        await prisma.subscribe.create({
            data: {
                email,
            }
        });
        return { message: "Thanks for subscribing!" }
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {
                    error: {
                        email: ["This email is already subscribed!"]
                    }
                };
            }
        }
        return {
            error: {
                email: ["Something went wrong, please try again."]
            }
        };
    }
}