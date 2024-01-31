import { ChangeArtDailyCard } from "../../../domain/usecases/change-art-daily-card";
import { CardDrizzleRepository } from "../../../infra/repositories/drizzle/implementations/card-drizzle-repository";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeChangeArtDailyCard = (): ChangeArtDailyCard => {
	const checkAvailableArtDailyCardsRepository = new CardDrizzleRepository();
	const chooseCardsRepository = new CardDrizzleRepository();
	const chooseArtDailyCardRepository = new CardDrizzleRepository();
	const refreshAvailableArtDailyCardsRepository = new CardDrizzleRepository();
	const setCardsRepository = new CardRedisRepository();
	const setArtDailyCardRepository = new CardRedisRepository();
	return new ChangeArtDailyCard(
		checkAvailableArtDailyCardsRepository,
		chooseCardsRepository,
		chooseArtDailyCardRepository,
		refreshAvailableArtDailyCardsRepository,
		setCardsRepository,
		setArtDailyCardRepository,
	);
};
