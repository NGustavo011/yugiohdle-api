import {
	describe,
	test,
	type Mock,
	beforeAll,
	expect,
	beforeEach,
	vi,
} from "vitest";
import { GetArtDailyCard } from "../../../src/domain/usecases/get-art-daily-card";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("GetArtDailyCard usecase", () => {
	let getArtDailyCardRepository: {
		getArtDailyCard: Mock;
	};
	let sut: GetArtDailyCard;

	beforeAll(() => {
		getArtDailyCardRepository = {
			getArtDailyCard: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new GetArtDailyCard(getArtDailyCardRepository);
	});

	describe("GetArtDailyCardRepository dependency", () => {
		test("Should call GetArtDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(getArtDailyCardRepository.getArtDailyCard).toHaveBeenCalled();
		});

		test("Should pass exception if GetArtDailyCardRepository throws an error", async () => {
			getArtDailyCardRepository.getArtDailyCard.mockImplementationOnce(
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
