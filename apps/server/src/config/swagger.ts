export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "Rishabh Provision Store REST API",
    version: "1.0.0",
    description: "Enterprise Retail OS REST Endpoints Documentation",
  },
  servers: [
    {
      url: "http://localhost:5001/api/v1",
      description: "Local Development Server",
    },
  ],
};

export default swaggerConfig;
