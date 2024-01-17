import { ChangeDailyCard } from "../../../domain/usecases/change-daily-card";
import { CardDrizzleRepository } from "../../../infra/repositories/drizzle/implementations/card-drizzle-repository";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeChangeDailyCard = (): ChangeDailyCard => {
	const checkAvailableDailyCardsRepository = new CardDrizzleRepository();
	const chooseDailyCardRepository = new CardDrizzleRepository();
	const refreshAvailableDailyCardsRepository = new CardDrizzleRepository();
	const setDailyCardRepository = new CardRedisRepository();
	return new ChangeDailyCard(
		checkAvailableDailyCardsRepository,
		chooseDailyCardRepository,
		refreshAvailableDailyCardsRepository,
		setDailyCardRepository,
	);
};
