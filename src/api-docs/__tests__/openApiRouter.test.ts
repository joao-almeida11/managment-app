import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "@/index.js";

import { generateOpenAPIDocument } from "../openApiDocumentGenerator.js";

describe("OpenAPI Router", () => {
  describe("Swagger JSON route", () => {
    it("should return Swagger JSON content", async () => {
      // Arrange
      const expectedResponse = generateOpenAPIDocument();

      // Act
      const response = await request(app).get("/swagger.json");

      // Assert
      expect(response.status).toBe("200");
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(expectedResponse);
    });

    it("should serve the Swagger UI", async () => {
      // Act
      const response = await request(app).get("/");

      // Assert
      expect(response.status).toBe("200");
      expect(response.text).toContain("swagger-ui");
    });
  });
});
