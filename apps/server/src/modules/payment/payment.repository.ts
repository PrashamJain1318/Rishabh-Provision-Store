import { PaymentModel, IPaymentDocument } from "./payment.model";
import { IPayment } from "./payment.types";

export class PaymentRepository {
  async create(data: Partial<IPayment>): Promise<IPayment> {
    const payment = new PaymentModel(data);
    return await payment.save();
  }

  async findById(id: string): Promise<IPayment | null> {
    return await PaymentModel.findById(id);
  }

  async findByOrderId(orderId: string): Promise<IPayment | null> {
    return await PaymentModel.findOne({ orderId });
  }

  async findByPaymentId(paymentId: string): Promise<IPayment | null> {
    return await PaymentModel.findOne({ paymentId });
  }

  async update(orderId: string, updates: Partial<IPayment>): Promise<IPayment | null> {
    return await PaymentModel.findOneAndUpdate({ orderId }, updates, { new: true });
  }

  async updateByPaymentId(paymentId: string, updates: Partial<IPayment>): Promise<IPayment | null> {
    return await PaymentModel.findOneAndUpdate({ paymentId }, updates, { new: true });
  }

  async findAll(queryObj: any = {}): Promise<{ payments: IPayment[]; total: number; page: number; limit: number }> {
    const page = parseInt(queryObj.page || "1", 10);
    const limit = parseInt(queryObj.limit || "20", 10);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (queryObj.status && queryObj.status !== "All") filter.status = queryObj.status;
    if (queryObj.search) {
      const s = queryObj.search.trim();
      filter.$or = [
        { orderId: { $regex: s, $options: "i" } },
        { paymentId: { $regex: s, $options: "i" } },
        { receipt: { $regex: s, $options: "i" } },
        { customerId: { $regex: s, $options: "i" } },
      ];
    }

    const [payments, total] = await Promise.all([
      PaymentModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      PaymentModel.countDocuments(filter),
    ]);

    return { payments, total, page, limit };
  }
}

export const paymentRepository = new PaymentRepository();
