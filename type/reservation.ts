import { Prisma } from "@prisma/client";

export type reservationProps = Prisma.ReservationGetPayload<{
    include: {
        Room: {
            select: {
                name:true,
                image:true,
                price:true
            }
        },
        User: {
            select: {
                name:true,
                email:true,
                phone:true
            }
        },
        Payment: true
    }
}>