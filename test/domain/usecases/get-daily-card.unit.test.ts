import {
	describe,
	test,
	jest,
	beforeAll,
	expect,
	spyOn,
	beforeEach,
} from "bun:test";
import { SavedCard } from "../../../src/domain/entities/card";
import { GetDailyCard } from "../../../src/domain/usecases/get-daily-card";

const throwError = (): never => {
	throw new Error();
};

describe("GetDailyCard usecase", () => {
	let getDailyCardRepository: {
		getDailyCard: jest.Mock;
	};
	let sut: GetDailyCard;

	const mockSavedCard = (): SavedCard => {
		return new SavedCard({
			id: "any_id",
			name: "any_name",
			race: "any_race",
			type: "any_type",
			archetype: "any_archetype",
			attribute: "any_attribute",
			description: "any_description",
			frameType: "any_frame_type",
			imageUrl: "any_image_url",
			imageUrlSmall: "any_image_url_small",
			imageUrlCropped: "any_image_url_cropped",
			atk: 0,
			def: 0,
			level: 0,
		});
	};

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
