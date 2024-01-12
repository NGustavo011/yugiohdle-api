import { describe, test, type Mock, beforeAll, expect, beforeEach, vi } from "vitest";
import { GetCards } from "../../../src/domain/usecases/get-cards";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("GetCards usecase", () => {
	let getCardsRepository: {
		getCards: Mock;
	};
	let sut: GetCards;

	beforeAll(() => {
		getCardsRepository = {
			getCards: vi.fn().mockImplementation(() => {
				return [mockSavedCard(), mockSavedCard(), mockSavedCard()];
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new GetCards(getCardsRepository);
	});

	describe("GetCardsRepository dependency", () => {
		test("Should call GetCardsRepository correctly", async () => {
			await sut.execute();

			expect(getCardsRepository.getCards).toHaveBeenCalled();
		});

		test("Should pass exception if GetCardsRepository throws an error", async () => {
			getCardsRepository.getCards.mockImplementationOnce(throwError);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	test("Should return a successful SavedCard", async () => {
		const card = await sut.execute();

		expect(card).toEqual([mockSavedCard(), mockSavedCard(), mockSavedCard()]);
	});
});
