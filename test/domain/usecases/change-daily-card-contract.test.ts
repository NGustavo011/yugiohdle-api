import { describe, test, jest, beforeAll, expect, beforeEach } from "bun:test";
import { ChangeDailyCard } from "../../../src/domain/usecases/change-daily-card";
import { mockSavedCard } from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("ChangeDailyCard usecase", () => {
	let checkAvailableDailyCardsRepository: {
		checkAvailableDailyCards: jest.Mock;
	};
	let chooseDailyCardRepository: {
		chooseDailyCard: jest.Mock;
	};
	let refreshAvailableDailyCardsRepository: {
		refreshAvailableDailyCards: jest.Mock;
	};
	let setDailyCardRepository: {
		setDailyCard: jest.Mock;
	};
	let sut: ChangeDailyCard;

	beforeAll(() => {
		checkAvailableDailyCardsRepository = {
			checkAvailableDailyCards: jest.fn().mockImplementation(() => {
				return true;
			}),
		};
		chooseDailyCardRepository = {
			chooseDailyCard: jest.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
		refreshAvailableDailyCardsRepository = {
			refreshAvailableDailyCards: jest.fn().mockImplementation(() => {
				return;
			}),
		};
		setDailyCardRepository = {
			setDailyCard: jest.fn().mockImplementation(() => {
				return;
			}),
		};
	});

	beforeEach(() => {
		jest.restoreAllMocks();
		sut = new ChangeDailyCard(
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
			).toHaveBeenCalled();
		});

		test("Should pass exception if CheckAvailableDailyCardsRepository throws an error", async () => {
			checkAvailableDailyCardsRepository.checkAvailableDailyCards.mockImplementationOnce(
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
			).not.toHaveBeenCalled();
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

	describe("ChooseDailyCardRepository dependency", () => {
		test("Should call ChooseDailyCardRepository correctly when CheckAvailableDailyCardsRepository returns true", async () => {
			await sut.execute();

			expect(chooseDailyCardRepository.chooseDailyCard).toHaveBeenCalled();
		});

		test("Should call ChooseDailyCardRepository correctly when CheckAvailableDailyCardsRepository returns false", async () => {
			checkAvailableDailyCardsRepository.checkAvailableDailyCards.mockImplementationOnce(
				() => {
					return false;
				},
			);

			await sut.execute();

			expect(chooseDailyCardRepository.chooseDailyCard).toHaveBeenCalled();
		});

		test("Should pass exception if ChooseDailyCardRepository throws an error", async () => {
			chooseDailyCardRepository.chooseDailyCard.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("SetDailyCardRepository dependency", () => {
		test("Should call SetDailyCardRepository correctly when CheckAvailableDailyCardsRepository returns true", async () => {
			await sut.execute();

			expect(setDailyCardRepository.setDailyCard).toHaveBeenCalledWith(
				mockSavedCard(),
			);
		});

		test("Should call SetDailyCardRepository correctly when CheckAvailableDailyCardsRepository returns false", async () => {
			checkAvailableDailyCardsRepository.checkAvailableDailyCards.mockImplementationOnce(
				() => {
					return false;
				},
			);

			await sut.execute();

			expect(setDailyCardRepository.setDailyCard).toHaveBeenCalledWith(
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
