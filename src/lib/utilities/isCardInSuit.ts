import type { Card, CardSuit } from '$lib/types/Card';
import { isLeftBower, LeftBowerMap } from './isLeftBower';

export const isCardInSuit = (card: Card, suit?: CardSuit, trump?: CardSuit) => {
	if (!suit) {
		return false;
	}
	const cardIsLeftBower = trump && isLeftBower(card, trump);
	if (cardIsLeftBower) {
		return LeftBowerMap[card.suit] === suit;
	}
	return card.suit === suit;
};
