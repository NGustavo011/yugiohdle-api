import { describe, test, beforeAll, expect, beforeEach } from "vitest";
import { CardDrizzleRepository } from "../../../../../src/infra/repositories/drizzle/implementations/card-drizzle-repository";
import { clearDatabase, insertCard } from "../../../../mocks/mock-drizzle";
import { db } from "../../../../../src/infra/repositories/drizzle/config/connection";
import { card } from "../../../../../src/infra/repositories/drizzle/schemas/card";
import { eq } from "drizzle-orm";

describe("CardDrizzleRepository usecase", () => {
	let sut: CardDrizzleRepository;

	beforeEach(async () => {
		sut = new CardDrizzleRepository();
		await clearDatabase();
	});

	describe("checkAvailableDailyCards()", () => {
		test("It should return false if it doesn't find any available cards", async () => {
			await insertCard(false);

			const areCardsAvailable = await sut.checkAvailableDailyCards();

			expect(areCardsAvailable).toBeFalsy();
		});

		test("It should return true if find any available cards", async () => {
			await insertCard();

			const areCardsAvailable = await sut.checkAvailableDailyCards();

			expect(areCardsAvailable).toBeTruthy();
		});
	});

	describe("chooseDailyCard()", () => {
		test("Shoud return an available card and update it at the db to become unavailable", async () => {
			await insertCard(false);
			await insertCard();
			await insertCard();

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

	describe("getCards()", () => {
		test("Must return all existing cards", async () => {
			await insertCard(false);
			await insertCard();
			await insertCard();

			const cards = await sut.getCards();

			expect(cards).toHaveLength(3);
		});
	});

	describe("refreshAvailableDailyCards", () => {
		test("Must update the available column of all existing cards", async () => {
			await insertCard(false);
			await insertCard(false);
			await insertCard();

			await sut.refreshAvailableDailyCards();
			const availableCards = await db
				.select()
				.from(card)
				.where(eq(card.available, true));

			expect(availableCards).toHaveLength(3);
		});
	});
});
