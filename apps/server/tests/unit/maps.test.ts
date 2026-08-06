import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Google Maps Platform Unit & Integration Tests", () => {
  it("should geocode address into coordinates", async () => {
    const res = await api.get("/api/v1/maps/geocode?address=Dadar%20West%20Mumbai");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("lat");
    expect(res.body.data).toHaveProperty("lng");
  });

  it("should reverse geocode coordinates into formatted address", async () => {
    const res = await api.get("/api/v1/maps/reverse-geocode?lat=19.0178&lng=72.8478");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("formattedAddress");
  });

  it("should return place autocomplete suggestions", async () => {
    const res = await api.get("/api/v1/maps/place-autocomplete?input=Dadar");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should calculate route directions and ETA", async () => {
    const res = await api.get("/api/v1/maps/directions?origin=Dadar&destination=BKC");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("estimatedDeliveryMinutes");
  });
});
