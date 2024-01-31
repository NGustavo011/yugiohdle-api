import { ChangeClassicDailyCard } from "../../../domain/usecases/change-classic-daily-card";
import { CardDrizzleRepository } from "../../../infra/repositories/drizzle/implementations/card-drizzle-repository";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeChangeClassicDailyCard = (): ChangeClassicDailyCard => {
	const checkAvailableClassicDailyCardsRepository = new CardDrizzleRepository();
	const chooseCardsRepository = new CardDrizzleRepository();
	const chooseClassicDailyCardRepository = new CardDrizzleRepository();
	const refreshAvailableClassicDailyCardsRepository =
		new CardDrizzleRepository();
	const setCardsRepository = new CardRedisRepository();
	const setClassicDailyCardRepository = new CardRedisRepository();
	return new ChangeClassicDailyCard(
		checkAvailableClassicDailyCardsRepository,
		chooseCardsRepository,
		chooseClassicDailyCardRepository,
		refreshAvailableClassicDailyCardsRepository,
		setCardsRepository,
		setClassicDailyCardRepository,
	);
};
