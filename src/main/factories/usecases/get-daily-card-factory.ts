import { GetDailyCard } from "../../../domain/usecases/get-daily-card";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeGetDailyCard = (): GetDailyCard => {
	const getDailyCardRepository = new CardRedisRepository();
	return new GetDailyCard(getDailyCardRepository);
};
