import {object,string } from "zod";

export const SubscribeSchema = object ({
    email:string().min(6,"Email at least 6 characters").email("Please enter a valid email"),
})
