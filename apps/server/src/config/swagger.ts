export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Rishabh Provision Store REST API",
    version: "1.0.0",
    description: "Enterprise Retail OS REST Endpoints Specification & Interactive Swagger Documentation.",
    contact: {
      name: "Rishabh Provision Store Tech Team",
      email: "support@rishabhstore.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5001/api/v1",
      description: "Local Development API Server",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentication, Registration, Refresh Tokens & User Profile" },
    { name: "Users", description: "User Management & Role Administration" },
    { name: "Products", description: "Grocery Catalog Items, SKU Search & Pricing" },
    { name: "Payment", description: "Razorpay Payments, Signature Verification, Refunds & Webhooks" },
    { name: "Upload", description: "Cloudinary CDN Image Processing & Media Assets" },
    { name: "Inventory", description: "Stock Levels, Batch Expiry Alert Monitor & Reorders" },
    { name: "Customers", description: "Customer CRM, Addresses & Loyalty Accounts" },
    { name: "Orders", description: "Omnichannel Orders & Fulfillment Stream" },
    { name: "POS", description: "Express Cashier POS Terminal Checkout & Thermal Receipts" },
    { name: "Notifications", description: "Merchant In-App Alerts & System Notifications" },
    { name: "AI Assistant", description: "Gemini AI Business Assistant & Forecasting Queries" },
    { name: "Backup", description: "MongoDB Database Snapshots & Audit Trail" },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT Access Token issued by /api/v1/auth/login",
      },
    },
  },
  paths: {
    "/health": {
      get: {
        summary: "Server Health Check Endpoint",
        tags: ["System"],
        responses: {
          200: { description: "Server is online and healthy" },
        },
      },
    },
    "/payment/create-order": {
      post: {
        summary: "Generate Razorpay Order",
        tags: ["Payment"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["amount"],
                properties: {
                  amount: { type: "number", example: 500, description: "Amount in INR (₹)" },
                  currency: { type: "string", example: "INR" },
                  receipt: { type: "string", example: "INV00001" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Razorpay order generated",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Razorpay order created successfully",
                  data: {
                    orderId: "order_K7x9Pz2mQ4n1",
                    amount: 50000,
                    currency: "INR",
                    keyId: "rzp_test_TMUGIqr1crkycf",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/payment/verify": {
      post: {
        summary: "Verify Razorpay Payment Signature (HMAC SHA-256)",
        tags: ["Payment"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"],
                properties: {
                  razorpay_order_id: { type: "string", example: "order_K7x9Pz2mQ4n1" },
                  razorpay_payment_id: { type: "string", example: "pay_M9k8L7j6H5g4" },
                  razorpay_signature: { type: "string", example: "4d7c88b9a0f1e2d3c4b5a6789" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Payment verified successfully" },
          400: { description: "Signature verification failed" },
        },
      },
    },
    "/payment/refund": {
      post: {
        summary: "Process Razorpay Payment Refund",
        tags: ["Payment"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["paymentId"],
                properties: {
                  paymentId: { type: "string", example: "pay_M9k8L7j6H5g4" },
                  amount: { type: "number", example: 500 },
                  reason: { type: "string", example: "Item out of stock" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Refund processed successfully" },
        },
      },
    },
    "/payment/history": {
      get: {
        summary: "Retrieve Paginated Payment History Logs",
        tags: ["Payment"],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["All", "PENDING", "CAPTURED", "FAILED", "REFUNDED"] } },
        ],
        responses: {
          200: { description: "Payment history list" },
        },
      },
    },
    "/upload/single": {
      post: {
        summary: "Upload Product Image to Cloudinary CDN",
        tags: ["Upload"],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["image"],
                properties: {
                  image: {
                    type: "string",
                    format: "binary",
                    description: "Product image file (JPG, JPEG, PNG, WEBP max 5MB)",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Image uploaded successfully" },
        },
      },
    },
    "/auth/register": {
      post: {
        summary: "Register Store Staff or Customer Account",
        tags: ["Auth"],
        responses: {
          201: { description: "Registration successful" },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Sign In with Email/Username & Password",
        tags: ["Auth"],
        responses: {
          200: { description: "Sign in successful" },
        },
      },
    },
    "/products": {
      get: {
        summary: "Retrieve Grocery Product Catalog",
        tags: ["Products"],
        responses: {
          200: { description: "Catalog items list" },
        },
      },
    },
  },
};

export default swaggerSpec;
