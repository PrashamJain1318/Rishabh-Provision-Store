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
    { name: "Observability & Health", description: "Enterprise Health Check Probes, Process Metrics & Monitoring Dashboard" },
    { name: "Jobs & Queues", description: "BullMQ Background Job Processing Dashboard & Queue Metrics" },
    { name: "Notifications", description: "Firebase Cloud Messaging (FCM) Push Notifications & Device Token Management" },
    { name: "Maps", description: "Google Maps Platform Geocoding, Reverse Geocoding, Places Autocomplete & Route Directions" },
    { name: "AI Assistant", description: "Google Gemini 2.5 AI Business Intelligence & Forecasting" },
    { name: "Payment", description: "Razorpay Payments, Signature Verification, Refunds & Webhooks" },
    { name: "Upload", description: "Cloudinary CDN Image Processing & Media Assets" },
    { name: "Inventory", description: "Stock Levels, Batch Expiry Alert Monitor & Reorders" },
    { name: "Customers", description: "Customer CRM, Addresses & Loyalty Accounts" },
    { name: "Orders", description: "Omnichannel Orders & Fulfillment Stream" },
    { name: "POS", description: "Express Cashier POS Terminal Checkout & Thermal Receipts" },
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
    "/health/live": {
      get: {
        summary: "Process Liveness Probe",
        tags: ["Observability & Health"],
        responses: { 200: { description: "Process is live" } },
      },
    },
    "/health/ready": {
      get: {
        summary: "Readiness Check Probe",
        tags: ["Observability & Health"],
        responses: { 200: { description: "Backend is ready for traffic" }, 503: { description: "Backend not ready" } },
      },
    },
    "/health/system": {
      get: {
        summary: "Retrieve System CPU & RAM Utilization",
        tags: ["Observability & Health"],
        responses: { 200: { description: "CPU, Memory, and Uptime metrics" } },
      },
    },
    "/health/dependencies": {
      get: {
        summary: "Probe All 8 Backend Service Dependencies",
        tags: ["Observability & Health"],
        responses: { 200: { description: "Dependency connection states and ping latency" } },
      },
    },
    "/monitoring/dashboard": {
      get: {
        summary: "Retrieve Full Observability Dashboard Payload",
        tags: ["Observability & Health"],
        responses: { 200: { description: "Metrics, dependency statuses, and active alerts" } },
      },
    },
    "/jobs/status": {
      get: {
        summary: "Retrieve BullMQ Queue Metrics and Worker Status",
        tags: ["Jobs & Queues"],
        responses: { 200: { description: "Real-time metrics for waiting, active, completed, failed and delayed jobs across all 7 queues" } },
      },
    },
    "/notifications/register-device": {
      post: {
        summary: "Register FCM Device Token for Push Notifications",
        tags: ["Notifications"],
        responses: { 201: { description: "Device token registered successfully" } },
      },
    },
    "/maps/geocode": {
      get: {
        summary: "Geocode Address to Latitude and Longitude",
        tags: ["Maps"],
        responses: { 200: { description: "Coordinates and formatted address" } },
      },
    },
    "/ai/query": {
      post: {
        summary: "Query Google Gemini AI Business Intelligence Engine",
        tags: ["AI Assistant"],
        responses: { 200: { description: "Gemini AI response generated" } },
      },
    },
    "/payment/create-order": {
      post: {
        summary: "Generate Razorpay Order",
        tags: ["Payment"],
        responses: { 201: { description: "Razorpay order generated" } },
      },
    },
    "/upload/single": {
      post: {
        summary: "Upload Product Image to Cloudinary CDN",
        tags: ["Upload"],
        responses: { 200: { description: "Image uploaded successfully" } },
      },
    },
    "/auth/login": {
      post: {
        summary: "Sign In with Email/Username & Password",
        tags: ["Auth"],
        responses: { 200: { description: "Sign in successful" } },
      },
    },
    "/products": {
      get: {
        summary: "Retrieve Grocery Product Catalog",
        tags: ["Products"],
        responses: { 200: { description: "Catalog items list" } },
      },
    },
  },
};

export default swaggerSpec;
