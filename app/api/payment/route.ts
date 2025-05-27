import { NextResponse } from "next/server";
import Midtrans from "midtrans-client"
import { reservationProps } from "@/type/reservation";

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
})

export const POST = async(request: Request)=> {
    try {
        const reservation: reservationProps = await request.json()
        

        const parameter = {
            transaction_details: {
                order_id: reservation.id,
                gross_amount: reservation.Payment?.amount || 0
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: reservation.user.name,
                email: reservation.user.email,
            }
        }
        
        const token = await snap.createTransactionToken(parameter);
        return NextResponse.json({token})
    } catch (error) {
        console.error("Payment processing error:", error);
        return NextResponse.json(
            { error: "Failed to process payment" },
            { status: 500 }
        );
    }
}