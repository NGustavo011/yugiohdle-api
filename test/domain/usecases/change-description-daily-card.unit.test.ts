import {
	describe,
	test,
	type Mock,
	beforeAll,
	expect,
	beforeEach,
	vi,
} from "vitest";
import { ChangeDescriptionDailyCard } from "../../../src/domain/usecases/change-description-daily-card";
import {
	mockSavedCard,
	mockSavedCardWithPropsNull,
} from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";
import type { Modes } from "../../../src/domain/entities/card";

describe("ChangeDescriptionDailyCard usecase", () => {
	const mode: Modes = "availableDescriptionDailyCard";

	let checkAvailableDailyCardsRepository: {
		checkAvailableDailyCards: Mock;
	};
	let chooseDailyCardRepository: {
		chooseDailyCard: Mock;
	};
	let refreshAvailableDailyCardsRepository: {
		refreshAvailableDailyCards: Mock;
	};
	let setDailyCardRepository: {
		setDailyCard: Mock;
	};
	let sut: ChangeDescriptionDailyCard;

	beforeAll(() => {
		checkAvailableDailyCardsRepository = {
			checkAvailableDailyCards: vi.fn().mockImplementation(() => {
				return true;
			}),
		};
		chooseDailyCardRepository = {
			chooseDailyCard: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
		refreshAvailableDailyCardsRepository = {
			refreshAvailableDailyCards: vi.fn().mockImplementation(() => {
				return;
			}),
		};
		setDailyCardRepository = {
			setDailyCard: vi.fn().mockImplementation(() => {
				return;
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new ChangeDescriptionDailyCard(
			checkAvailableDailyCardsRepository,
			chooseDailyCardRepository,
			refreshAvailableDailyCardsRepository,
			setDailyCardRepository,
		);
	});

	describe("CheckAvailableDailyCardsRepository dependency", () => {
		test("Should call CheckAvailableDailyCardsRepository correctly", async () => {
			await sut.execute();

			expect(
				checkAvailableDailyCardsRepository.checkAvailableDailyCards,
			).toHaveBeenCalledWith(mode);
		});

		test("Should pass exception if CheckAvailableDailyCardsRepository throws an error", async () => {
			checkAvailableDailyCardsRepository.checkAvailableDailyCards.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("ChooseDailyCardRepository dependency", () => {
		test("Should call ChooseDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(chooseDailyCardRepository.chooseDailyCard).toHaveBeenCalledWith(
				mode,
			);
		});

		test("Should pass exception if ChooseDailyCardRepository throws an error", async () => {
			chooseDailyCardRepository.chooseDailyCard.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("RefreshAvailableDailyCardRepository dependency", () => {
		test("Should not call RefreshAvailableDailyCardRepository correctly when CheckAvailableDailyCardsRepository returns true", async () => {
			await sut.execute();

			expect(
				refreshAvailableDailyCardsRepository.refreshAvailableDailyCards,
			).not.toHaveBeenCalledWith(mode);
		});

		test("Should call RefreshAvailableDailyCardRepository correctly when CheckAvailableDailyCardsRepository returns false", async () => {
			checkAvailableDailyCardsRepository.checkAvailableDailyCards.mockImplementationOnce(
				() => {
					return false;
				},
			);

			await sut.execute();

			expect(
				refreshAvailableDailyCardsRepository.refreshAvailableDailyCards,
			).toHaveBeenCalled();
		});

		test("Should pass exception if RefreshAvailableDailyCardRepository throws an error", async () => {
			checkAvailableDailyCardsRepository.checkAvailableDailyCards.mockImplementationOnce(
				() => {
					return false;
				},
			);
			refreshAvailableDailyCardsRepository.refreshAvailableDailyCards.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("SetDailyCardRepository dependency", () => {
		test("Should call SetDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(setDailyCardRepository.setDailyCard).toHaveBeenCalledWith(
				mode,
				mockSavedCard(),
			);
		});

		test("Should pass exception if SetDailyCardRepository throws an error", async () => {
			setDailyCardRepository.setDailyCard.mockImplementationOnce(throwError);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});
});
