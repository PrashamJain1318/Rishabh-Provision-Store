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
    { name: "Maps", description: "Google Maps Platform Geocoding, Reverse Geocoding, Places Autocomplete & Route Directions" },
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
    "/maps/geocode": {
      get: {
        summary: "Geocode Address to Latitude and Longitude",
        tags: ["Maps"],
        parameters: [
          { name: "address", in: "query", required: true, schema: { type: "string", example: "Dadar West, Mumbai" } },
        ],
        responses: {
          200: { description: "Coordinates and formatted address" },
        },
      },
    },
    "/maps/reverse-geocode": {
      get: {
        summary: "Reverse Geocode Latitude and Longitude to Formatted Address",
        tags: ["Maps"],
        parameters: [
          { name: "lat", in: "query", required: true, schema: { type: "number", example: 19.0178 } },
          { name: "lng", in: "query", required: true, schema: { type: "number", example: 72.8478 } },
        ],
        responses: {
          200: { description: "Formatted street address" },
        },
      },
    },
    "/maps/place-autocomplete": {
      get: {
        summary: "Google Places Autocomplete Location Suggestions",
        tags: ["Maps"],
        parameters: [
          { name: "input", in: "query", required: true, schema: { type: "string", example: "Dadar" } },
        ],
        responses: {
          200: { description: "List of matching places and place IDs" },
        },
      },
    },
    "/maps/directions": {
      get: {
        summary: "Calculate Route Distance, ETA, and Directions",
        tags: ["Maps"],
        parameters: [
          { name: "origin", in: "query", required: true, schema: { type: "string", example: "Rishabh Store Dadar" } },
          { name: "destination", in: "query", required: true, schema: { type: "string", example: "BKC Mumbai" } },
        ],
        responses: {
          200: { description: "Distance, ETA duration, and polyline points" },
        },
      },
    },
    "/ai/query": {
      post: {
        summary: "Query Google Gemini AI Business Intelligence Engine",
        tags: ["AI Assistant"],
        responses: {
          200: { description: "Gemini AI response generated" },
        },
      },
    },
    "/payment/create-order": {
      post: {
        summary: "Generate Razorpay Order",
        tags: ["Payment"],
        responses: {
          201: { description: "Razorpay order generated" },
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
