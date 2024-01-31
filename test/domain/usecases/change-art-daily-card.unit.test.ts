import {
	describe,
	test,
	type Mock,
	beforeAll,
	expect,
	beforeEach,
	vi,
} from "vitest";
import { ChangeArtDailyCard } from "../../../src/domain/usecases/change-art-daily-card";
import {
	mockSavedCard,
	mockSavedCardWithPropsNull,
} from "../../mocks/mock-card";
import { throwError } from "../../mocks/mock-error";

describe("ChangeArtDailyCard usecase", () => {
	let checkAvailableArtDailyCardsRepository: {
		checkAvailableArtDailyCards: Mock;
	};
	let chooseCardsRepository: {
		chooseCards: Mock;
	};
	let chooseArtDailyCardRepository: {
		chooseArtDailyCard: Mock;
	};
	let refreshAvailableArtDailyCardsRepository: {
		refreshAvailableArtDailyCards: Mock;
	};
	let setCardsRepository: {
		setCards: Mock;
	};
	let setArtDailyCardRepository: {
		setArtDailyCard: Mock;
	};
	let sut: ChangeArtDailyCard;

	beforeAll(() => {
		checkAvailableArtDailyCardsRepository = {
			checkAvailableArtDailyCards: vi.fn().mockImplementation(() => {
				return true;
			}),
		};
		chooseCardsRepository = {
			chooseCards: vi.fn().mockImplementation(() => {
				return [mockSavedCard(), mockSavedCardWithPropsNull()];
			}),
		};
		chooseArtDailyCardRepository = {
			chooseArtDailyCard: vi.fn().mockImplementation(() => {
				return mockSavedCard();
			}),
		};
		refreshAvailableArtDailyCardsRepository = {
			refreshAvailableArtDailyCards: vi.fn().mockImplementation(() => {
				return;
			}),
		};
		setCardsRepository = {
			setCards: vi.fn().mockImplementation(() => {
				return;
			}),
		};
		setArtDailyCardRepository = {
			setArtDailyCard: vi.fn().mockImplementation(() => {
				return;
			}),
		};
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new ChangeArtDailyCard(
			checkAvailableArtDailyCardsRepository,
			chooseCardsRepository,
			chooseArtDailyCardRepository,
			refreshAvailableArtDailyCardsRepository,
			setCardsRepository,
			setArtDailyCardRepository,
		);
	});

	describe("ChooseArtDailyCardRepository dependency", () => {
		test("Should call ChooseArtDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(
				chooseArtDailyCardRepository.chooseArtDailyCard,
			).toHaveBeenCalled();
		});

		test("Should pass exception if ChooseArtDailyCardRepository throws an error", async () => {
			chooseArtDailyCardRepository.chooseArtDailyCard.mockImplementationOnce(
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

	describe("CheckAvailableArtDailyCardsRepository dependency", () => {
		test("Should call CheckAvailableArtDailyCardsRepository correctly", async () => {
			await sut.execute();

			expect(
				checkAvailableArtDailyCardsRepository.checkAvailableArtDailyCards,
			).toHaveBeenCalled();
		});

		test("Should pass exception if CheckAvailableArtDailyCardsRepository throws an error", async () => {
			checkAvailableArtDailyCardsRepository.checkAvailableArtDailyCards.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("RefreshAvailableArtDailyCardRepository dependency", () => {
		test("Should not call RefreshAvailableArtDailyCardRepository correctly when CheckAvailableArtDailyCardsRepository returns true", async () => {
			await sut.execute();

			expect(
				refreshAvailableArtDailyCardsRepository.refreshAvailableArtDailyCards,
			).not.toHaveBeenCalled();
		});

		test("Should call RefreshAvailableArtDailyCardRepository correctly when CheckAvailableArtDailyCardsRepository returns false", async () => {
			checkAvailableArtDailyCardsRepository.checkAvailableArtDailyCards.mockImplementationOnce(
				() => {
					return false;
				},
			);

			await sut.execute();

			expect(
				refreshAvailableArtDailyCardsRepository.refreshAvailableArtDailyCards,
			).toHaveBeenCalled();
		});

		test("Should pass exception if RefreshAvailableArtDailyCardRepository throws an error", async () => {
			checkAvailableArtDailyCardsRepository.checkAvailableArtDailyCards.mockImplementationOnce(
				() => {
					return false;
				},
			);
			refreshAvailableArtDailyCardsRepository.refreshAvailableArtDailyCards.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("ChooseArtDailyCardRepository dependency", () => {
		test("Should call ChooseArtDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(
				chooseArtDailyCardRepository.chooseArtDailyCard,
			).toHaveBeenCalled();
		});

		test("Should pass exception if ChooseArtDailyCardRepository throws an error", async () => {
			chooseArtDailyCardRepository.chooseArtDailyCard.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});

	describe("SetArtDailyCardRepository dependency", () => {
		test("Should call SetArtDailyCardRepository correctly", async () => {
			await sut.execute();

			expect(setArtDailyCardRepository.setArtDailyCard).toHaveBeenCalledWith(
				mockSavedCard(),
			);
		});

		test("Should pass exception if SetArtDailyCardRepository throws an error", async () => {
			setArtDailyCardRepository.setArtDailyCard.mockImplementationOnce(
				throwError,
			);

			const promise = sut.execute();

			await expect(promise).rejects.toThrow();
		});
	});
});
