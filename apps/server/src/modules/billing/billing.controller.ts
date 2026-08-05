import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response";

export const processPOSCheckout = (req: Request, res: Response) => {
  const { cartItems, customerId, paymentMode, couponCode } = req.body;

  const totalAmount = cartItems ? cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) : 0;
  const billNo = `#BILL-${Math.floor(1000 + Math.random() * 9000)}`;

  return sendSuccess({
    res,
    statusCode: 201,
    message: "POS Transaction Completed Successfully",
    data: {
      billNo,
      totalAmount,
      paymentMode: paymentMode || "Cash",
      printedAt: new Date().toISOString(),
    },
  });
};
