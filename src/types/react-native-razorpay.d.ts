declare module 'react-native-razorpay' {
  type Success = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
  type Options = { key: string; amount: number; currency: string; order_id: string; name: string; description: string; prefill?: { contact?: string; email?: string }; theme?: { color?: string } };
  export default class RazorpayCheckout { static open(options: Options): Promise<Success>; }
}
