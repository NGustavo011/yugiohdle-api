import type { SavedCard } from "../../../../domain/entities/card";

export interface SetCardsRepository {
	setCards(cards: SavedCard[]): Promise<void>;
}
