import { describe, expect, test } from "vitest";
import { app } from "../../../src/main/config/app";

describe("Card Routes", () => {
	describe("GET /get-cards", () => {
		test("Should return status code 200 in case of success in the get-cards route", async () => {
			const response = await app
				.handle(new Request("http://localhost:3333/get-cards?a=1"))
				.then((res) => res.status);
			expect(response).toBe(200);
		});
	});

	describe("GET /get-daily-card", () => {
		test("Should return status code 200 in case of success in the get-daily-card route", async () => {
			const response = await app
				.handle(new Request("http://localhost:3333/get-daily-card"))
				.then((res) => res.status);
			expect(response).toBe(200);
		});
	});
});
