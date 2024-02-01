import {
	describe,
	test,
	type Mock,
	beforeAll,
	expect,
	beforeEach,
	vi,
} from "vitest";
import { GetClassicDailyCard } from "../../../src/domain/usecases/get-classic-daily-card";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";
import type { Modes } from "../../../src/domain/entities/card";

describe("GetClassicDailyCard usecase", () => {
	const mode: Modes = "availableClassicDailyCard";

	let getDailyCardRepository: {
		getDailyCard: Mock;
	};
	let sut: GetClassicDailyCard;

	beforeAll(() => {
		getDailyCardRepository = {
			getDailyCard: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new GetClassicDailyCard(getDailyCardRepository);
	});

	describe("GetDailyCardRepository dependency", () => {
		test("Should call GetDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(getDailyCardRepository.getDailyCard).toHaveBeenCalledWith(mode);
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
