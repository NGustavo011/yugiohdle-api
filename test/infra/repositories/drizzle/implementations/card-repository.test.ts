import { describe, test, jest, beforeAll, expect, beforeEach } from "bun:test";
import { CardRepository } from "../../../../../src/infra/repositories/drizzle/implementations/card-repository";
import { clearDatabase, insertCard } from "../../../../mocks/mock-drizzle";
import { db } from "../../../../../src/infra/repositories/drizzle/config/connection";
import { card } from "../../../../../src/infra/repositories/drizzle/schemas/card";
import { eq } from "drizzle-orm";

describe("CardRepository usecase", () => {
	let sut: CardRepository;

	beforeEach(async () => {
		sut = new CardRepository();
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
		test("Should return a card available", async () => {
			await insertCard(false);
			await insertCard();
			await insertCard();
			const dailyCard = await sut.chooseDailyCard();
			expect(dailyCard).toBeTruthy();
			expect(dailyCard.getDto().available).toBeTruthy();
		});
	});

	describe("getCardsOptions()", () => {
		test("Must return all existing cards as options", async () => {
			await insertCard(false);
			await insertCard();
			await insertCard();
			const options = await sut.getCardsOptions();
			expect(options).toHaveLength(3);
		});
	});

	describe("getUnlimitedCards()", () => {
		test("Must return all existing cards in random order to unlimited mode", async () => {
			await insertCard(false);
			await insertCard();
			await insertCard();
			const options = await sut.getUnlimitedCards();
			expect(options).toHaveLength(3);
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
