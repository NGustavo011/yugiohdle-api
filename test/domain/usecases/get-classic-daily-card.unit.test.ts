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

describe("GetClassicDailyCard usecase", () => {
	let getClassicDailyCardRepository: {
		getClassicDailyCard: Mock;
	};
	let sut: GetClassicDailyCard;

	beforeAll(() => {
		getClassicDailyCardRepository = {
			getClassicDailyCard: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new GetClassicDailyCard(getClassicDailyCardRepository);
	});

	describe("GetClassicDailyCardRepository dependency", () => {
		test("Should call GetClassicDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(
				getClassicDailyCardRepository.getClassicDailyCard,
			).toHaveBeenCalled();
		});

		test("Should pass exception if GetClassicDailyCardRepository throws an error", async () => {
			getClassicDailyCardRepository.getClassicDailyCard.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	test("Should return a successful SavedCard", async () => {
		const card = await sut.execute();

		expect(card).toEqual(mockSavedCard());
	});
});
