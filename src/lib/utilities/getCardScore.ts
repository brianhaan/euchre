import { Value, type Card, type CardSuit } from '$lib/types/Card';
import { isLeftBower } from './isLeftBower';

export const getCardScore = (card: Card | undefined, currentSuit: CardSuit, trump: CardSuit) => {
	if (!card) {
		return -1;
	}
	const baseValue = card.value as number;
	if (card.suit === trump) {
		return card.value === Value.Jack ? baseValue + 110 : baseValue + 100;
	} else if (isLeftBower(card, trump)) {
		return baseValue + 105;
	} else if (card.suit !== currentSuit) {
		return 0;
	}
	return baseValue;
};
