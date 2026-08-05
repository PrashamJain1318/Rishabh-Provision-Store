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
    { name: "Auth", description: "Authentication, Registration, Refresh Tokens & Sessions" },
    { name: "Products", description: "Grocery Catalog Items, SKU Search & Pricing" },
    { name: "Inventory", description: "Stock Levels, Batch Expiry Alert Monitor & Reorders" },
    { name: "Orders", description: "Omnichannel Orders & Fulfillment Stream" },
    { name: "Billing", description: "Express Cashier POS Terminal Checkout & Thermal Receipts" },
    { name: "Reports", description: "Business Intelligence Turnover Metrics & GSTR Exports" },
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
          200: {
            description: "Server is online and healthy",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Sign In with Email & Password",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "owner@rishabhstore.com" },
                  password: { type: "string", example: "admin123" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Sign in successful" },
          401: { description: "Invalid credentials" },
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
    "/billing/checkout": {
      post: {
        summary: "Process Express POS Transaction & Bill",
        tags: ["Billing"],
        security: [{ BearerAuth: [] }],
        responses: {
          201: { description: "POS Bill generated successfully" },
        },
      },
    },
  },
};

export default swaggerSpec;
