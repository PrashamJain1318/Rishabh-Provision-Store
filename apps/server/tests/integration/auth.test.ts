import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Auth Integration Tests", () => {
  const testUser = {
    firstName: "Prasham",
    lastName: "Jain",
    email: "test.auth@rishabhstore.com",
    password: "Password123@",
    phone: "9876543210",
  };

  it("should register a new store user successfully", async () => {
    const res = await api.post("/api/v1/auth/register").send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUser.email);
    expect(res.body.data.user).not.toHaveProperty("password");
  });

  it("should reject duplicate registration for existing email", async () => {
    await api.post("/api/v1/auth/register").send(testUser);
    const res = await api.post("/api/v1/auth/register").send(testUser);

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it("should login user with correct credentials and return access token", async () => {
    await api.post("/api/v1/auth/register").send(testUser);

    const loginRes = await api.post("/api/v1/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);
    expect(loginRes.body.data).toHaveProperty("accessToken");
  });

  it("should reject login attempt with incorrect password", async () => {
    await api.post("/api/v1/auth/register").send(testUser);

    const loginRes = await api.post("/api/v1/auth/login").send({
      email: testUser.email,
      password: "WrongPassword123!",
    });

    expect(loginRes.status).toBe(401);
    expect(loginRes.body.success).toBe(false);
  });

  it("should access protected profile route with valid Bearer token", async () => {
    await api.post("/api/v1/auth/register").send(testUser);
    const loginRes = await api.post("/api/v1/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    const token = loginRes.body.data.accessToken;

    const profileRes = await api
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(profileRes.status).toBe(200);
    expect(profileRes.body.success).toBe(true);
    expect(profileRes.body.data.email).toBe(testUser.email);
  });

  it("should reject profile request without authorization token", async () => {
    const profileRes = await api.get("/api/v1/auth/profile");

    expect([401, 429]).toContain(profileRes.status);
    expect(profileRes.body.success).toBe(false);
  });
});
