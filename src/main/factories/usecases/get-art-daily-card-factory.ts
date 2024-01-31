import { GetArtDailyCard } from "../../../domain/usecases/get-art-daily-card";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeGetArtDailyCard = (): GetArtDailyCard => {
	const getArtDailyCardRepository = new CardRedisRepository();
	return new GetArtDailyCard(getArtDailyCardRepository);
};
