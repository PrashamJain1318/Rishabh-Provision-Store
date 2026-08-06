import env from "./env";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RazorpaySDK = require("razorpay");

export const isRazorpayConfigured = (): boolean => {
  const keyId = process.env.RAZORPAY_KEY_ID || env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET || env.RAZORPAY_KEY_SECRET;
  return Boolean(keyId && keySecret);
};

const keyId = process.env.RAZORPAY_KEY_ID || env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET || env.RAZORPAY_KEY_SECRET;

export const razorpayInstance = new RazorpaySDK({
  key_id: keyId || "rzp_test_TMUGIqr1crkycf",
  key_secret: keySecret || "HWY7A0VwxEOKk7ki30MmhmRy",
});

export default razorpayInstance;
