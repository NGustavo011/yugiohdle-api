import { GetDescriptionDailyCard } from "../../../domain/usecases/get-description-daily-card";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeGetDescriptionDailyCard = (): GetDescriptionDailyCard => {
	const getDescriptionDailyCardRepository = new CardRedisRepository();
	return new GetDescriptionDailyCard(getDescriptionDailyCardRepository);
};
