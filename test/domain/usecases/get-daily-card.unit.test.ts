import { describe, test,type Mock, beforeAll, expect, beforeEach, vi } from "vitest";
import { GetDailyCard } from "../../../src/domain/usecases/get-daily-card";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("GetDailyCard usecase", () => {
	let getDailyCardRepository: {
		getDailyCard: Mock;
	};
	let sut: GetDailyCard;

	beforeAll(() => {
		getDailyCardRepository = {
			getDailyCard: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
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

			await expect(promise).rejects.toThrow();
		});
	});

	test("Should return a successful SavedCard", async () => {
		const card = await sut.execute();

		expect(card).toEqual(mockSavedCard());
	});
});
