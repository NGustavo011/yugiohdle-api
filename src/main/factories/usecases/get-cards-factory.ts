import { GetCards } from "../../../domain/usecases/get-cards";
import { CardRedisRepository } from "../../../infra/repositories/redis/implementations/card-redis-repository";

export const makeGetCards = (): GetCards => {
	const getCardsRepository = new CardRedisRepository();
	return new GetCards(getCardsRepository);
};
