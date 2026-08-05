import { Request, Response } from "express";

export const processPOSCheckout = (req: Request, res: Response) => {
  const { cartItems, customerId, paymentMode, couponCode } = req.body;

  const totalAmount = cartItems ? cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) : 0;
  const billNo = `#BILL-${Math.floor(1000 + Math.random() * 9000)}`;

  res.status(201).json({
    success: true,
    message: "POS Transaction Completed Successfully",
    bill: {
      billNo,
      totalAmount,
      paymentMode: paymentMode || "Cash",
      printedAt: new Date().toISOString(),
    },
  });
};
