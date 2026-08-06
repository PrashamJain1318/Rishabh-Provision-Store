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
    { name: "AI Assistant", description: "Google Gemini 2.5 AI Business Intelligence & Forecasting" },
    { name: "Payment", description: "Razorpay Payments, Signature Verification, Refunds & Webhooks" },
    { name: "Upload", description: "Cloudinary CDN Image Processing & Media Assets" },
    { name: "Inventory", description: "Stock Levels, Batch Expiry Alert Monitor & Reorders" },
    { name: "Customers", description: "Customer CRM, Addresses & Loyalty Accounts" },
    { name: "Orders", description: "Omnichannel Orders & Fulfillment Stream" },
    { name: "POS", description: "Express Cashier POS Terminal Checkout & Thermal Receipts" },
    { name: "Notifications", description: "Merchant In-App Alerts & System Notifications" },
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
    "/ai/query": {
      post: {
        summary: "Query Google Gemini AI Business Intelligence Engine",
        tags: ["AI Assistant"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["prompt"],
                properties: {
                  prompt: { type: "string", example: "Summarize today's business." },
                  context: { type: "string", example: "Gross revenue ₹18,450" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Gemini AI response generated",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Gemini AI query processed successfully",
                  data: {
                    prompt: "Summarize today's business.",
                    response: "✨ Today's Summary: Gross Revenue ₹18,450 (+14.2%)....",
                    model: "gemini-2.5-flash",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/ai/inventory-advice": {
      post: {
        summary: "Retrieve Gemini AI Inventory Optimization Advice",
        tags: ["AI Assistant"],
        responses: {
          200: { description: "Reorder lists, dead stock & stockout predictions" },
        },
      },
    },
    "/ai/sales-forecast": {
      post: {
        summary: "Retrieve Gemini AI 7-Day and 30-Day Sales Demand Forecast",
        tags: ["AI Assistant"],
        responses: {
          200: { description: "Revenue projections and growth insights" },
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
          201: { description: "Razorpay order generated" },
        },
      },
    },
    "/payment/verify": {
      post: {
        summary: "Verify Razorpay Payment Signature (HMAC SHA-256)",
        tags: ["Payment"],
        responses: {
          200: { description: "Payment verified successfully" },
        },
      },
    },
    "/payment/refund": {
      post: {
        summary: "Process Razorpay Payment Refund",
        tags: ["Payment"],
        responses: {
          200: { description: "Refund processed successfully" },
        },
      },
    },
    "/payment/history": {
      get: {
        summary: "Retrieve Paginated Payment History Logs",
        tags: ["Payment"],
        responses: {
          200: { description: "Payment history list" },
        },
      },
    },
    "/upload/single": {
      post: {
        summary: "Upload Product Image to Cloudinary CDN",
        tags: ["Upload"],
        responses: {
          200: { description: "Image uploaded successfully" },
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
