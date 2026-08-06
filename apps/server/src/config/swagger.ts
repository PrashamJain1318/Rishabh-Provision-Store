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
    "/auth/register": {
      post: {
        summary: "Register Store Staff or Customer Account",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["firstName", "lastName", "email", "password"],
                properties: {
                  firstName: { type: "string", example: "Ramesh" },
                  lastName: { type: "string", example: "Kumar" },
                  email: { type: "string", example: "ramesh@gmail.com" },
                  phone: { type: "string", example: "9812345678" },
                  password: { type: "string", example: "RameshPass123@" },
                  role: { type: "string", enum: ["Owner", "Manager", "Cashier", "Employee", "Delivery Partner", "Customer"], example: "Customer" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Registration successful" },
          400: { description: "Validation failed" },
          409: { description: "Email or phone already exists" },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Sign In with Email/Username & Password",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "rps_admin" },
                  email: { type: "string", example: "admin@rishabhstore.com" },
                  password: { type: "string", example: "rishabh1234@" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Sign in successful" },
          401: { description: "Invalid credentials" },
          403: { description: "Account deactivated" },
        },
      },
    },
    "/auth/profile": {
      get: {
        summary: "Retrieve Authenticated User Profile",
        tags: ["Auth"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "User profile retrieved successfully" },
          401: { description: "Unauthorized token missing or invalid" },
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
    "/inventory": {
      get: {
        summary: "Retrieve Inventory Stock Valuation & Aging",
        tags: ["Inventory"],
        responses: {
          200: { description: "Inventory items list" },
        },
      },
    },
    "/customers": {
      get: {
        summary: "Retrieve Customer CRM Profiles",
        tags: ["Customers"],
        responses: {
          200: { description: "Customers list" },
        },
      },
    },
    "/orders": {
      get: {
        summary: "Retrieve Omnichannel Orders List",
        tags: ["Orders"],
        responses: {
          200: { description: "Orders list" },
        },
      },
    },
    "/pos/checkout": {
      post: {
        summary: "Process Express POS 1-Click Transaction",
        tags: ["POS"],
        responses: {
          200: { description: "POS transaction success" },
        },
      },
    },
    "/notifications": {
      get: {
        summary: "Retrieve Merchant In-App Alerts",
        tags: ["Notifications"],
        responses: {
          200: { description: "Notifications list" },
        },
      },
    },
    "/ai/query": {
      post: {
        summary: "Query Gemini AI Business Assistant",
        tags: ["AI Assistant"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  prompt: { type: "string", example: "Summarize today's business" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "AI query response" },
        },
      },
    },
    "/backup/create": {
      post: {
        summary: "Generate 1-Click MongoDB Full Database Snapshot",
        tags: ["Backup"],
        responses: {
          201: { description: "Backup snapshot generated" },
        },
      },
    },
  },
};

export default swaggerSpec;
