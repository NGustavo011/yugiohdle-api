import { ChangeDescriptionDailyCard } from "../../../domain/usecases/change-description-daily-card";
import { CardDrizzleRepository } from "../../../infra/repositories/drizzle/implementations/card-drizzle-repository";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeChangeDescriptionDailyCard =
	(): ChangeDescriptionDailyCard => {
		const checkAvailableDescriptionDailyCardsRepository =
			new CardDrizzleRepository();
		const chooseDescriptionDailyCardRepository = new CardDrizzleRepository();
		const refreshAvailableDescriptionDailyCardsRepository =
			new CardDrizzleRepository();
		const setDescriptionDailyCardRepository = new CardRedisRepository();
		return new ChangeDescriptionDailyCard(
			checkAvailableDescriptionDailyCardsRepository,
			chooseDescriptionDailyCardRepository,
			refreshAvailableDescriptionDailyCardsRepository,
			setDescriptionDailyCardRepository,
		);
	};
