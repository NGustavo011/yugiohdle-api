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

	describe("checkAvailableArtDailyCards()", () => {
		test("It should return false if it doesn't find any available cards", async () => {
			await insertCard(mockSavedCard(), "availableArtDailyCard", false);

			const areCardsAvailable = await sut.checkAvailableArtDailyCards();

			expect(areCardsAvailable).toBeFalsy();
		});

		test("It should return true if find any available cards", async () => {
			await insertCard(mockSavedCard(), "availableArtDailyCard");

			const areCardsAvailable = await sut.checkAvailableArtDailyCards();

			expect(areCardsAvailable).toBeTruthy();
		});
	});

	describe("checkAvailableClassicDailyCards()", () => {
		test("It should return false if it doesn't find any available cards", async () => {
			await insertCard(mockSavedCard(), "availableClassicDailyCard", false);

			const areCardsAvailable = await sut.checkAvailableClassicDailyCards();

			expect(areCardsAvailable).toBeFalsy();
		});

		test("It should return true if find any available cards", async () => {
			await insertCard(mockSavedCard(), "availableClassicDailyCard");

			const areCardsAvailable = await sut.checkAvailableClassicDailyCards();

			expect(areCardsAvailable).toBeTruthy();
		});
	});

	describe("chooseArtDailyCard()", () => {
		test("Should return an available card and update it at the db to become unavailable", async () => {
			await insertCard(mockSavedCard(), "availableArtDailyCard", false);
			await insertCard(mockSavedCard(), "availableArtDailyCard");
			await insertCard(mockSavedCard(), "availableArtDailyCard");

			const dailyCard = await sut.chooseArtDailyCard();
			const dailyCardInDb = await db
				.select()
				.from(card)
				.where(eq(card.id, dailyCard.getDto().id));

			expect(dailyCard).toBeTruthy();
			expect(dailyCard.getDto().availableArtDailyCard).toBeTruthy();
			expect(dailyCardInDb[0].id).toBe(dailyCard.getDto().id);
			expect(dailyCardInDb[0].availableArtDailyCard).toBeFalsy();
		});

		test("Should return an available card with missing information and update it at the db to become unavailable", async () => {
			await insertCard(
				mockSavedCardWithPropsNull(),
				"availableArtDailyCard",
				false,
			);
			await insertCard(mockSavedCardWithPropsNull(), "availableArtDailyCard");
			await insertCard(mockSavedCardWithPropsNull(), "availableArtDailyCard");

			const dailyCard = await sut.chooseArtDailyCard();
			const dailyCardInDb = await db
				.select()
				.from(card)
				.where(eq(card.id, dailyCard.getDto().id));

			expect(dailyCard).toBeTruthy();
			expect(dailyCard.getDto().availableArtDailyCard).toBeTruthy();
			expect(dailyCardInDb[0].id).toBe(dailyCard.getDto().id);
			expect(dailyCardInDb[0].availableArtDailyCard).toBeFalsy();
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

			const dailyCard = await sut.chooseClassicDailyCard();
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

			const dailyCard = await sut.chooseClassicDailyCard();
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

	describe("refreshAvailableArtDailyCards", () => {
		test("Must update the available column of all existing cards", async () => {
			await insertCard(mockSavedCard(), "availableArtDailyCard", false);
			await insertCard(mockSavedCard(), "availableArtDailyCard");
			await insertCard(
				mockSavedCardWithPropsNull(),
				"availableArtDailyCard",
				false,
			);

			await sut.refreshAvailableArtDailyCards();
			const availableCards = await db
				.select()
				.from(card)
				.where(eq(card.availableArtDailyCard, true));

			expect(availableCards).toHaveLength(3);
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

			await sut.refreshAvailableClassicDailyCards();
			const availableCards = await db
				.select()
				.from(card)
				.where(eq(card.availableClassicDailyCard, true));

			expect(availableCards).toHaveLength(3);
		});
	});
});
