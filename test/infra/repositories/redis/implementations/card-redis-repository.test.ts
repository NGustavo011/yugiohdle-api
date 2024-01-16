import { describe, test, expect, beforeEach } from "vitest";
import {
	mockSavedCard,
	mockSavedCardWithPropsNull,
} from "../../../../mocks/mock-card";
import {
	clearCache,
	insertCards,
	insertDailyCard,
	receiveCards,
	receiveDailyCard,
} from "../../../../mocks/mock-redis";
import { CardRedisRepository } from "../../../../../src/infra/repositories/redis/implementations/card-redis-repository";

describe("CardRedis repository", () => {
	let sut: CardRedisRepository;

	beforeEach(async () => {
		sut = new CardRedisRepository();
		await clearCache();
	});

	describe("getCards()", () => {
		test("Should return all SavedCards", async () => {
			await insertCards();

			const cards = await sut.getCards();

			expect(cards).toBeTruthy();
			expect(cards).toHaveLength(2);
		});
	});

	describe("getDailyCard()", () => {
		test("Should return a successful SavedCard marked as DailyCard", async () => {
			await insertDailyCard(mockSavedCard());

			const dailyCard = await sut.getDailyCard();

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().atk).toBe(mockSavedCard().getDto().atk);
			expect(dailyCard.getDto().available).toBe(
				mockSavedCard().getDto().available,
			);
		});

		test("Should return a successful SavedCard with missing information marked as DailyCard", async () => {
			await insertDailyCard(mockSavedCardWithPropsNull());

			const dailyCard = await sut.getDailyCard();
			console.log(dailyCard);
			console.log(dailyCard.getDto());

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().attribute).toBeNull();
			expect(dailyCard.getDto().atk).toBeNull();
			expect(dailyCard.getDto().available).toBe(
				mockSavedCardWithPropsNull().getDto().available,
			);
		});
	});

	describe("setCards()", () => {
		test("Must set all existing Cards in the cache", async () => {
			await sut.setCards([mockSavedCard(), mockSavedCardWithPropsNull()]);

			const cards = await receiveCards();

			expect(cards).toBeTruthy();
			expect(cards).toHaveLength(2);
		});
	});

	describe("setDailyCard()", () => {
		test("Must set a card available as DailyCard", async () => {
			await sut.setDailyCard(mockSavedCard());
			const dailyCard = await receiveDailyCard();

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().attribute).toBe(
				mockSavedCard().getDto().attribute,
			);
			expect(dailyCard.getDto().atk).toBe(mockSavedCard().getDto().atk);
			expect(dailyCard.getDto().available).toBe(
				mockSavedCard().getDto().available,
			);
		});

		test("Must define an available card with missing information as DailyCard", async () => {
			await sut.setDailyCard(mockSavedCardWithPropsNull());
			const dailyCard = await receiveDailyCard();

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().attribute).toBeNull();
			expect(dailyCard.getDto().atk).toBeNull();
			expect(dailyCard.getDto().available).toBe(
				mockSavedCardWithPropsNull().getDto().available,
			);
		});
	});
});
