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
			await insertCard(mockSavedCard(), "availableClassicDailyCard", false);

			const areCardsAvailable = await sut.checkAvailableDailyCards(
				"availableClassicDailyCard",
			);

			expect(areCardsAvailable).toBeFalsy();
		});

		test("It should return true if find any available cards", async () => {
			await insertCard(mockSavedCard(), "availableClassicDailyCard");

			const areCardsAvailable = await sut.checkAvailableDailyCards(
				"availableClassicDailyCard",
			);

			expect(areCardsAvailable).toBeTruthy();
		});
	});

	describe("chooseCards()", () => {
		test("Must return all existing cards", async () => {
			await insertCard(
				mockSavedCard(),
				"availableArtDailyCard",
				false,
				"any_name_1",
			);
			await insertCard(
				mockSavedCard(),
				"availableArtDailyCard",
				true,
				"any_name_3",
			);
			await insertCard(
				mockSavedCard(),
				"availableClassicDailyCard",
				false,
				"any_name_3",
			);
			await insertCard(
				mockSavedCardWithPropsNull(),
				"availableClassicDailyCard",
				true,
				"any_name_2",
			);

			const cards = await sut.chooseCards();

			expect(cards).toHaveLength(4);
		});
	});

	describe("chooseClassicDailyCard()", () => {
		test("Should return an available card and update it at the db to become unavailable", async () => {
			await insertCard(mockSavedCard(), "availableClassicDailyCard", false);
			await insertCard(mockSavedCard(), "availableClassicDailyCard");
			await insertCard(mockSavedCard(), "availableClassicDailyCard");

			const dailyCard = await sut.chooseDailyCard("availableClassicDailyCard");
			const dailyCardInDb = await db
				.select()
				.from(card)
				.where(eq(card.id, dailyCard.getDto().id));

			expect(dailyCard).toBeTruthy();
			expect(dailyCard.getDto().availableClassicDailyCard).toBeTruthy();
			expect(dailyCardInDb[0].id).toBe(dailyCard.getDto().id);
			expect(dailyCardInDb[0].availableClassicDailyCard).toBeFalsy();
		});

		test("Should return an available card with missing information and update it at the db to become unavailable", async () => {
			await insertCard(
				mockSavedCardWithPropsNull(),
				"availableClassicDailyCard",
				false,
			);
			await insertCard(
				mockSavedCardWithPropsNull(),
				"availableClassicDailyCard",
			);
			await insertCard(
				mockSavedCardWithPropsNull(),
				"availableClassicDailyCard",
			);

			const dailyCard = await sut.chooseDailyCard("availableClassicDailyCard");
			const dailyCardInDb = await db
				.select()
				.from(card)
				.where(eq(card.id, dailyCard.getDto().id));

			expect(dailyCard).toBeTruthy();
			expect(dailyCard.getDto().availableClassicDailyCard).toBeTruthy();
			expect(dailyCardInDb[0].id).toBe(dailyCard.getDto().id);
			expect(dailyCardInDb[0].availableClassicDailyCard).toBeFalsy();
		});
	});

	describe("refreshAvailableClassicDailyCards", () => {
		test("Must update the available column of all existing cards", async () => {
			await insertCard(mockSavedCard(), "availableClassicDailyCard", false);
			await insertCard(mockSavedCard(), "availableClassicDailyCard");
			await insertCard(
				mockSavedCardWithPropsNull(),
				"availableClassicDailyCard",
				false,
			);

			await sut.refreshAvailableDailyCards("availableClassicDailyCard");
			const availableCards = await db
				.select()
				.from(card)
				.where(eq(card.availableClassicDailyCard, true));

			expect(availableCards).toHaveLength(3);
		});
	});
});
