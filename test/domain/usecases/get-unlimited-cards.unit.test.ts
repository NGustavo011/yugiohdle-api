import { describe, test, jest, beforeAll, expect, beforeEach } from "bun:test";
import { GetUnlimitedCards } from "../../../src/domain/usecases/get-unlimited-cards";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("GetUnlimitedCards usecase", () => {
	let getUnlimitedCardsRepository: {
		getUnlimitedCards: jest.Mock;
	};
	let sut: GetUnlimitedCards;

	beforeAll(() => {
		getUnlimitedCardsRepository = {
			getUnlimitedCards: jest.fn().mockImplementation(() => {
				return [mockSavedCard(), mockSavedCard(), mockSavedCard()];
			}),
		};
	});

	beforeEach(() => {
		jest.restoreAllMocks();
		sut = new GetUnlimitedCards(getUnlimitedCardsRepository);
	});

	describe("GetUnlimitedCardsRepository dependency", () => {
		test("Should call GetUnlimitedCardsRepository correctly", async () => {
			await sut.execute();
			expect(getUnlimitedCardsRepository.getUnlimitedCards).toHaveBeenCalled();
		});

		test("Should pass exception if GetUnlimitedCardsRepository throws an error", async () => {
			getUnlimitedCardsRepository.getUnlimitedCards.mockImplementationOnce(
				throwError,
			);
			const promise = sut.execute();
			console.log(promise);
			await expect(promise).rejects.toThrow();
		});
	});

	test("Should return a successful SavedCard", async () => {
		const card = await sut.execute();
		expect(card).toEqual([mockSavedCard(), mockSavedCard(), mockSavedCard()]);
	});
});
