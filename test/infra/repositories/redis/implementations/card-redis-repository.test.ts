import { describe, test, expect, beforeEach } from "vitest";
import { mockSavedCard } from "../../../../mocks/mock-card";
import {
	clearCache,
	insertDailyCard,
	receiveDailyCard,
} from "../../../../mocks/mock-redis";
import { CardRedisRepository } from "../../../../../src/infra/repositories/redis/implementations/card-redis-repository";

describe("CardRedisRepository usecase", () => {
	let sut: CardRedisRepository;

	beforeEach(async () => {
		sut = new CardRedisRepository();
		await clearCache();
	});

	describe("getDailyCard()", () => {
		test("Should return a successful SavedCard.", async () => {
			await insertDailyCard();

			const dailyCard = await sut.getDailyCard();

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().atk).toBe(mockSavedCard().getDto().atk);
			expect(dailyCard.getDto().available).toBe(
				mockSavedCard().getDto().available,
			);
		});
	});

	describe("setDailyCard()", () => {
		test("Shoud return an available card and update it at the db to become unavailable", async () => {
			await sut.setDailyCard(mockSavedCard());
			const dailyCard = await receiveDailyCard();

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().atk).toBe(mockSavedCard().getDto().atk);
			expect(dailyCard.getDto().available).toBe(
				mockSavedCard().getDto().available,
			);
		});
	});
});
