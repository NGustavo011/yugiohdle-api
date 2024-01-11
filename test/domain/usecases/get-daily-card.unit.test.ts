import { describe, test, jest, beforeAll, expect, beforeEach } from "bun:test";
import { GetDailyCard } from "../../../src/domain/usecases/get-daily-card";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("GetDailyCard usecase", () => {
	let getDailyCardRepository: {
		getDailyCard: jest.Mock;
	};
	let sut: GetDailyCard;

	beforeAll(() => {
		getDailyCardRepository = {
			getDailyCard: jest.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
	});

	beforeEach(() => {
		jest.restoreAllMocks();
		sut = new GetDailyCard(getDailyCardRepository);
	});

	describe("GetDailyCardRepository dependency", () => {
		test("Should call GetDailyCardRepository correctly", async () => {
			await sut.execute();
			expect(getDailyCardRepository.getDailyCard).toHaveBeenCalled();
		});

		test("Should pass exception if GetDailyCardRepository throws an error", async () => {
			getDailyCardRepository.getDailyCard.mockImplementationOnce(throwError);
			const promise = sut.execute();
			console.log(promise);
			await expect(promise).rejects.toThrow();
		});
	});

	test("Should return a successful SavedCard", async () => {
		const card = await sut.execute();
		expect(card).toEqual(mockSavedCard());
	});
});
