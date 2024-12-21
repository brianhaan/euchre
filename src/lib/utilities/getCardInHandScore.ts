import { Suit, Value, type Card, type CardSuit } from '$lib/types/Card';
import { isLeftBower } from './isLeftBower';

export const getCardInHandScore = (card: Card, trump?: CardSuit) => {
	const baseValue = card.value as number;
	if (card.suit === trump) {
		return card.value === Value.Jack ? baseValue + 110 : baseValue + 100;
	} else if (trump && isLeftBower(card, trump)) {
		return baseValue + 105;
	} else {
		if (card.suit === Suit.Hearts) {
			return baseValue + 30;
		} else if (card.suit === Suit.Spades) {
			return baseValue + 20;
		} else if (card.suit === Suit.Diamonds) {
			return baseValue + 10;
		}
		return baseValue;
	}
	return baseValue;
};
