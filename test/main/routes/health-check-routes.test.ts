import { describe, expect, test } from "vitest";
import { app } from "../../../src/main/config/app";

describe("HealthCheck Routes", () => {
	describe("GET /health-check", () => {
		test("Should return status code 200 in case of success in the health-check route", async () => {
			const response = await app
				.handle(new Request("http://localhost:3333/health-check"))
				.then((res) => res.status);
			expect(response).toBe(200);
		});
	});
});
