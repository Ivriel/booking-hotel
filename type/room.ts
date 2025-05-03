import { Prisma } from "@prisma/client";

export type RoomProps = Prisma.RoomGetPayload<{
    include:{RoomAmenities:{select:{amenitiesId:true}}}
}>