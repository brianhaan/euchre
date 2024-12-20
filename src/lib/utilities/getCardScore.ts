import type { Card, CardSuit } from '$lib/types/Card';
import { isLeftBower } from './isLeftBower';

export const getCardScore = (card: Card | undefined, currentSuit: CardSuit, trump: CardSuit) => {
	if (!card) {
		return -1;
	}
	const baseValue = card.value as number;
	if (card.suit === trump) {
		return baseValue + 100;
	} else if (isLeftBower(card, trump)) {
		return baseValue + 99.5;
	} else if (card.suit !== currentSuit) {
		return 0;
	}
	return baseValue;
};
