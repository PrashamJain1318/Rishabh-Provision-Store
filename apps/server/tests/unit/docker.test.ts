import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Enterprise Docker & Containerization Integration Tests", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("should verify web multi-stage Dockerfile and Nginx configuration exist", () => {
    const dockerfile = fs.readFileSync(path.join(rootDir, "apps/web/Dockerfile"), "utf-8");
    const nginxConf = fs.readFileSync(path.join(rootDir, "apps/web/nginx.conf"), "utf-8");

    expect(dockerfile).toContain("FROM node:20-alpine AS builder");
    expect(dockerfile).toContain("FROM nginx:1.25-alpine AS runner");
    expect(nginxConf).toContain("location /healthz");
  });

  it("should verify server Dockerfile uses unprivileged user and healthcheck", () => {
    const dockerfile = fs.readFileSync(path.join(rootDir, "apps/server/Dockerfile"), "utf-8");

    expect(dockerfile).toContain("USER node");
    expect(dockerfile).toContain("HEALTHCHECK");
    expect(dockerfile).toContain("http://localhost:5001/api/v1/health/live");
  });

  it("should verify production docker-compose.prod.yml defines restart policies and network bridge", () => {
    const composeProd = fs.readFileSync(path.join(rootDir, "docker-compose.prod.yml"), "utf-8");

    expect(composeProd).toContain("restart: always");
    expect(composeProd).toContain("store_prod_network");
  });
});
