import { describe, test, beforeAll, expect, beforeEach } from "vitest";
import { CardDrizzleRepository } from "../../../../../src/infra/repositories/drizzle/implementations/card-drizzle-repository";
import { clearDatabase, insertCard } from "../../../../mocks/mock-drizzle";
import { db } from "../../../../../src/infra/repositories/drizzle/config/connection";
import { card } from "../../../../../src/infra/repositories/drizzle/schemas/card";
import { eq } from "drizzle-orm";
import {
	mockSavedCard,
	mockSavedCardWithPropsNull,
} from "../../../../mocks/mock-card";

describe("CardDrizzle repository", () => {
	let sut: CardDrizzleRepository;

	beforeEach(async () => {
		sut = new CardDrizzleRepository();
		await clearDatabase();
	});

	describe("checkAvailableDailyCards()", () => {
		test("It should return false if it doesn't find any available cards", async () => {
			await insertCard(mockSavedCard(), false);

			const areCardsAvailable = await sut.checkAvailableDailyCards();

			expect(areCardsAvailable).toBeFalsy();
		});

		test("It should return true if find any available cards", async () => {
			await insertCard(mockSavedCard());

			const areCardsAvailable = await sut.checkAvailableDailyCards();

			expect(areCardsAvailable).toBeTruthy();
		});
	});

	describe("chooseCards()", () => {
		test("Must return all existing cards", async () => {
			await insertCard(mockSavedCard(), false);
			await insertCard(mockSavedCard());
			await insertCard(mockSavedCardWithPropsNull());

			const cards = await sut.chooseCards();

			expect(cards).toHaveLength(3);
		});
	});

	describe("chooseDailyCard()", () => {
		test("Should return an available card and update it at the db to become unavailable", async () => {
			await insertCard(mockSavedCard(), false);
			await insertCard(mockSavedCard());
			await insertCard(mockSavedCard());

			const dailyCard = await sut.chooseDailyCard();
			const dailyCardInDb = await db
				.select()
				.from(card)
				.where(eq(card.id, dailyCard.getDto().id));

			expect(dailyCard).toBeTruthy();
			expect(dailyCard.getDto().available).toBeTruthy();
			expect(dailyCardInDb[0].id).toBe(dailyCard.getDto().id);
			expect(dailyCardInDb[0].available).toBeFalsy();
		});

		test("Should return an available card with missing information and update it at the db to become unavailable", async () => {
			await insertCard(mockSavedCardWithPropsNull(), false);
			await insertCard(mockSavedCardWithPropsNull());
			await insertCard(mockSavedCardWithPropsNull());

			const dailyCard = await sut.chooseDailyCard();
			const dailyCardInDb = await db
				.select()
				.from(card)
				.where(eq(card.id, dailyCard.getDto().id));

			expect(dailyCard).toBeTruthy();
			expect(dailyCard.getDto().available).toBeTruthy();
			expect(dailyCardInDb[0].id).toBe(dailyCard.getDto().id);
			expect(dailyCardInDb[0].available).toBeFalsy();
		});
	});

	describe("refreshAvailableDailyCards", () => {
		test("Must update the available column of all existing cards", async () => {
			await insertCard(mockSavedCard(), false);
			await insertCard(mockSavedCard());
			await insertCard(mockSavedCardWithPropsNull(), false);

			await sut.refreshAvailableDailyCards();
			const availableCards = await db
				.select()
				.from(card)
				.where(eq(card.available, true));

			expect(availableCards).toHaveLength(3);
		});
	});
});
