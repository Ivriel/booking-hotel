export interface PaymentProps {
    transaction_status:string;
    payment_type?:string;
    fraud_status:string;
    status_code:string;
    gross_amount:string;
    signature_key:string;
    order_id:string;
}