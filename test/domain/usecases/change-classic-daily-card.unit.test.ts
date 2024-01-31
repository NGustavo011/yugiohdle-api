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

describe("ChangeClassicDailyCard usecase", () => {
	let checkAvailableClassicDailyCardsRepository: {
		checkAvailableClassicDailyCards: Mock;
	};
	let chooseCardsRepository: {
		chooseCards: Mock;
	};
	let chooseClassicDailyCardRepository: {
		chooseClassicDailyCard: Mock;
	};
	let refreshAvailableClassicDailyCardsRepository: {
		refreshAvailableClassicDailyCards: Mock;
	};
	let setCardsRepository: {
		setCards: Mock;
	};
	let setClassicDailyCardRepository: {
		setClassicDailyCard: Mock;
	};
	let sut: ChangeClassicDailyCard;

	beforeAll(() => {
		checkAvailableClassicDailyCardsRepository = {
			checkAvailableClassicDailyCards: vi.fn().mockImplementation(() => {
				return true;
			}),
		};
		chooseCardsRepository = {
			chooseCards: vi.fn().mockImplementation(() => {
				return [mockSavedCard(), mockSavedCardWithPropsNull()];
			}),
		};
		chooseClassicDailyCardRepository = {
			chooseClassicDailyCard: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
		refreshAvailableClassicDailyCardsRepository = {
			refreshAvailableClassicDailyCards: vi.fn().mockImplementation(() => {
				return;
			}),
		};
		setCardsRepository = {
			setCards: vi.fn().mockImplementation(() => {
				return;
			}),
		};
		setClassicDailyCardRepository = {
			setClassicDailyCard: vi.fn().mockImplementation(() => {
				return;
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new ChangeClassicDailyCard(
			checkAvailableClassicDailyCardsRepository,
			chooseCardsRepository,
			chooseClassicDailyCardRepository,
			refreshAvailableClassicDailyCardsRepository,
			setCardsRepository,
			setClassicDailyCardRepository,
		);
	});

	describe("ChooseClassicDailyCardRepository dependency", () => {
		test("Should call ChooseClassicDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(
				chooseClassicDailyCardRepository.chooseClassicDailyCard,
			).toHaveBeenCalled();
		});

		test("Should pass exception if ChooseClassicDailyCardRepository throws an error", async () => {
			chooseClassicDailyCardRepository.chooseClassicDailyCard.mockImplementationOnce(
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

	describe("CheckAvailableClassicDailyCardsRepository dependency", () => {
		test("Should call CheckAvailableClassicDailyCardsRepository correctly", async () => {
			await sut.execute();

			expect(
				checkAvailableClassicDailyCardsRepository.checkAvailableClassicDailyCards,
			).toHaveBeenCalled();
		});

		test("Should pass exception if CheckAvailableClassicDailyCardsRepository throws an error", async () => {
			checkAvailableClassicDailyCardsRepository.checkAvailableClassicDailyCards.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("RefreshAvailableClassicDailyCardRepository dependency", () => {
		test("Should not call RefreshAvailableClassicDailyCardRepository correctly when CheckAvailableClassicDailyCardsRepository returns true", async () => {
			await sut.execute();

			expect(
				refreshAvailableClassicDailyCardsRepository.refreshAvailableClassicDailyCards,
			).not.toHaveBeenCalled();
		});

		test("Should call RefreshAvailableClassicDailyCardRepository correctly when CheckAvailableClassicDailyCardsRepository returns false", async () => {
			checkAvailableClassicDailyCardsRepository.checkAvailableClassicDailyCards.mockImplementationOnce(
				() => {
					return false;
				},
			);

			await sut.execute();

			expect(
				refreshAvailableClassicDailyCardsRepository.refreshAvailableClassicDailyCards,
			).toHaveBeenCalled();
		});

		test("Should pass exception if RefreshAvailableClassicDailyCardRepository throws an error", async () => {
			checkAvailableClassicDailyCardsRepository.checkAvailableClassicDailyCards.mockImplementationOnce(
				() => {
					return false;
				},
			);
			refreshAvailableClassicDailyCardsRepository.refreshAvailableClassicDailyCards.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("ChooseClassicDailyCardRepository dependency", () => {
		test("Should call ChooseClassicDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(
				chooseClassicDailyCardRepository.chooseClassicDailyCard,
			).toHaveBeenCalled();
		});

		test("Should pass exception if ChooseClassicDailyCardRepository throws an error", async () => {
			chooseClassicDailyCardRepository.chooseClassicDailyCard.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("SetClassicDailyCardRepository dependency", () => {
		test("Should call SetClassicDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(
				setClassicDailyCardRepository.setClassicDailyCard,
			).toHaveBeenCalledWith(mockSavedCard());
		});

		test("Should pass exception if SetClassicDailyCardRepository throws an error", async () => {
			setClassicDailyCardRepository.setClassicDailyCard.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});
});
