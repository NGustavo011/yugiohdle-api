import { describe, test, expect, beforeEach } from "vitest";
import {
	mockSavedCard,
	mockSavedCardWithPropsNull,
} from "../../../../mocks/mock-card";
import {
	clearCache,
	insertArtDailyCard,
	insertCards,
	insertClassicDailyCard,
	receiveArtDailyCard,
	receiveCards,
	receiveClassicDailyCard,
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
		test("Should return a successful SavedCard marked as ClassicDailyCard", async () => {
			await insertClassicDailyCard(mockSavedCard());

			const dailyCard = await sut.getDailyCard("availableClassicDailyCard");

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().atk).toBe(mockSavedCard().getDto().atk);
			expect(dailyCard.getDto().availableClassicDailyCard).toBe(
				mockSavedCard().getDto().availableClassicDailyCard,
			);
		});

		test("Should return a successful SavedCard with missing information marked as ClassicDailyCard", async () => {
			await insertClassicDailyCard(mockSavedCardWithPropsNull());

			const dailyCard = await sut.getDailyCard("availableClassicDailyCard");

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().attribute).toBeNull();
			expect(dailyCard.getDto().atk).toBeNull();
			expect(dailyCard.getDto().availableClassicDailyCard).toBe(
				mockSavedCardWithPropsNull().getDto().availableClassicDailyCard,
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
		test("Must set a card available as ClassicDailyCard", async () => {
			await sut.setDailyCard("availableClassicDailyCard", mockSavedCard());
			const dailyCard = await receiveClassicDailyCard();

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().attribute).toBe(
				mockSavedCard().getDto().attribute,
			);
			expect(dailyCard.getDto().atk).toBe(mockSavedCard().getDto().atk);
			expect(dailyCard.getDto().availableClassicDailyCard).toBe(
				mockSavedCard().getDto().availableClassicDailyCard,
			);
		});

		test("Must define an available card with missing information as ClassicDailyCard", async () => {
			await sut.setDailyCard(
				"availableClassicDailyCard",
				mockSavedCardWithPropsNull(),
			);
			const dailyCard = await receiveClassicDailyCard();

			expect(dailyCard.getDto().id).toBe(mockSavedCard().getDto().id);
			expect(dailyCard.getDto().name).toBe(mockSavedCard().getDto().name);
			expect(dailyCard.getDto().attribute).toBeNull();
			expect(dailyCard.getDto().atk).toBeNull();
			expect(dailyCard.getDto().availableClassicDailyCard).toBe(
				mockSavedCardWithPropsNull().getDto().availableClassicDailyCard,
			);
		});
	});
});
