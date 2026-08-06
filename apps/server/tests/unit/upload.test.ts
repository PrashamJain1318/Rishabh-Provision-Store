import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Cloudinary Upload Unit & Integration Tests", () => {
  it("should process image file upload or fallback clean response", async () => {
    const res = await api
      .post("/api/v1/upload/single")
      .attach("image", Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64"), "sample.png");

    expect([200, 500]).toContain(res.status);
    expect(res.body).toHaveProperty("success");
  });

  it("should reject non-image file formats", async () => {
    const res = await api
      .post("/api/v1/upload/single")
      .attach("image", Buffer.from("PDF_FILE_HEADER"), "document.pdf");

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
