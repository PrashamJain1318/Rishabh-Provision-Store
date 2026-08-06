import api from "../lib/api";

export const notificationService = {
  async registerDeviceToken(token: string, platform: "WEB" | "ANDROID" | "IOS" = "WEB") {
    const res = await api.post("/notifications/register-device", { token, platform });
    return res.data;
  },

  async sendPushNotification(data: { userId?: string; token?: string; title: string; body: string; type?: string; data?: any }) {
    const res = await api.post("/notifications/send", data);
    return res.data;
  },

  async getNotificationHistory(params?: any) {
    const res = await api.get("/notifications/history", { params });
    return res.data;
  },

  async unregisterDeviceToken(token: string) {
    const res = await fetch(`http://localhost:5001/api/v1/notifications/device/${encodeURIComponent(token)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  },

  async requestBrowserNotificationPermission(): Promise<string | null> {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const mockWebToken = `fcm_web_token_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
      await this.registerDeviceToken(mockWebToken, "WEB");
      return mockWebToken;
    }
    return null;
  },
};

export default notificationService;
