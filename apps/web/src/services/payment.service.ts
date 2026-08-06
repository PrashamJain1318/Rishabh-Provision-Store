import api from "../lib/api";

export interface IRazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface IVerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  receipt?: string;
  customerId?: string;
  items?: any[];
}

export interface IRefundPayload {
  paymentId: string;
  amount?: number;
  reason?: string;
}

export const paymentService = {
  async createOrder(data: { amount: number; currency?: string; receipt?: string; customerId?: string }): Promise<IRazorpayOrderResponse> {
    const res = await api.post("/payment/create-order", data);
    return res.data.data;
  },

  async verifyPayment(payload: IVerifyPaymentPayload) {
    const res = await api.post("/payment/verify", payload);
    return res.data;
  },

  async refund(payload: IRefundPayload) {
    const res = await api.post("/payment/refund", payload);
    return res.data;
  },

  async getPaymentHistory(params?: any) {
    const res = await api.get("/payment/history", { params });
    return res.data;
  },

  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-sdk-script")) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.id = "razorpay-sdk-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  async processRazorpayCheckout(options: {
    amount: number;
    receipt?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    onSuccess: (response: IVerifyPaymentPayload) => void;
    onFailure: (error: any) => void;
  }) {
    const isScriptLoaded = await this.loadRazorpayScript();
    if (!isScriptLoaded) {
      options.onFailure(new Error("Failed to load Razorpay SDK. Please check your internet connection."));
      return;
    }

    try {
      const orderData = await this.createOrder({
        amount: options.amount,
        receipt: options.receipt,
      });

      const rzpOptions = {
        key: orderData.keyId || "rzp_test_TMUGIqr1crkycf",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Rishabh Provision Store",
        description: "Grocery Order Payment",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200",
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            await this.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              receipt: options.receipt,
            });
            options.onSuccess(response);
          } catch (verifyErr) {
            options.onFailure(verifyErr);
          }
        },
        prefill: {
          name: options.customerName || "Store Customer",
          email: options.customerEmail || "customer@example.com",
          contact: options.customerPhone || "9876543210",
        },
        theme: {
          color: "#16a34a",
        },
        modal: {
          ondismiss: () => {
            options.onFailure(new Error("Razorpay Checkout dismissed by user."));
          },
        },
      };

      const razorpayObj = new (window as any).Razorpay(rzpOptions);
      razorpayObj.on("payment.failed", (response: any) => {
        options.onFailure(new Error(response.error.description || "Razorpay Payment Failed"));
      });
      razorpayObj.open();
    } catch (err: any) {
      options.onFailure(err);
    }
  },
};

export default paymentService;
