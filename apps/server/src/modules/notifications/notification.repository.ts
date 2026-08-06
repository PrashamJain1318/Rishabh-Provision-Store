import { DeviceTokenModel, NotificationHistoryModel } from "./notification.model";
import { IDeviceToken, INotificationHistory } from "./notification.types";

export class NotificationRepository {
  async registerDevice(data: { userId: string; token: string; platform?: string }): Promise<IDeviceToken> {
    return await DeviceTokenModel.findOneAndUpdate(
      { token: data.token },
      { userId: data.userId, token: data.token, platform: data.platform || "WEB" },
      { upsert: true, new: true }
    );
  }

  async removeDeviceToken(token: string): Promise<boolean> {
    const res = await DeviceTokenModel.deleteOne({ token });
    return res.deletedCount > 0;
  }

  async findTokensByUserId(userId: string): Promise<string[]> {
    const docs = await DeviceTokenModel.find({ userId });
    return docs.map((d) => d.token);
  }

  async logHistory(data: Partial<INotificationHistory>): Promise<INotificationHistory> {
    const doc = new NotificationHistoryModel(data);
    return await doc.save();
  }

  async getHistory(query: any = {}): Promise<{ history: INotificationHistory[]; total: number }> {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "20", 10);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.userId) filter.userId = query.userId;
    if (query.type) filter.type = query.type;

    const [history, total] = await Promise.all([
      NotificationHistoryModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      NotificationHistoryModel.countDocuments(filter),
    ]);

    return { history, total };
  }
}

export const notificationRepository = new NotificationRepository();
