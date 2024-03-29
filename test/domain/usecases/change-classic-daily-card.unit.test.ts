import {
	describe,
	test,
	type Mock,
	beforeAll,
	expect,
	beforeEach,
	vi,
} from "vitest";
import { ChangeClassicDailyCard } from "../../../src/domain/usecases/change-classic-daily-card";
import {
	mockSavedCard,
	mockSavedCardWithPropsNull,
} from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";
import type { Modes } from "../../../src/domain/entities/card";

describe("ChangeClassicDailyCard usecase", () => {
	const mode: Modes = "availableClassicDailyCard";

	let checkAvailableDailyCardsRepository: {
		checkAvailableDailyCards: Mock;
	};
	let chooseCardsRepository: {
		chooseCards: Mock;
	};
	let chooseDailyCardRepository: {
		chooseDailyCard: Mock;
	};
	let refreshAvailableDailyCardsRepository: {
		refreshAvailableDailyCards: Mock;
	};
	let setCardsRepository: {
		setCards: Mock;
	};
	let setDailyCardRepository: {
		setDailyCard: Mock;
	};
	let sut: ChangeClassicDailyCard;

	beforeAll(() => {
		checkAvailableDailyCardsRepository = {
			checkAvailableDailyCards: vi.fn().mockImplementation(() => {
				return true;
			}),
		};
		chooseCardsRepository = {
			chooseCards: vi.fn().mockImplementation(() => {
				return [mockSavedCard(), mockSavedCardWithPropsNull()];
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
		setCardsRepository = {
			setCards: vi.fn().mockImplementation(() => {
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
		sut = new ChangeClassicDailyCard(
			checkAvailableDailyCardsRepository,
			chooseCardsRepository,
			chooseDailyCardRepository,
			refreshAvailableDailyCardsRepository,
			setCardsRepository,
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

	describe("ChooseCardsRepository dependency", () => {
		test("Should call ChooseCardsRepository correctly", async () => {
			await sut.execute();

			expect(chooseCardsRepository.chooseCards).toHaveBeenCalledWith();
		});

		test("Should pass exception if ChooseCardsRepository throws an error", async () => {
			chooseCardsRepository.chooseCards.mockImplementationOnce(throwError);

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

	describe("SetCardsRepository dependency", () => {
		test("Should call SetCardsRepository correctly", async () => {
			await sut.execute();

			expect(setCardsRepository.setCards).toHaveBeenCalledWith([
				mockSavedCard(),
				mockSavedCardWithPropsNull(),
			]);
		});

		test("Should pass exception if SetCardsRepository throws an error", async () => {
			setCardsRepository.setCards.mockImplementationOnce(throwError);

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
