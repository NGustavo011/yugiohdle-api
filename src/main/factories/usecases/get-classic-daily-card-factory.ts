import { GetClassicDailyCard } from "../../../domain/usecases/get-classic-daily-card";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeGetClassicDailyCard = (): GetClassicDailyCard => {
	const getClassicDailyCardRepository = new CardRedisRepository();
	return new GetClassicDailyCard(getClassicDailyCardRepository);
};
