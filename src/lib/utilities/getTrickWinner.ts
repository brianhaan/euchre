import type { CardSuit } from '$lib/types/Card';
import type { Trick } from '$lib/types/Trick';
import { getCardScore } from './getCardScore';

export const getTrickWinner = (cards: Trick['cards'], currentSuit: CardSuit, trump: CardSuit) => {
	return cards
		.map((card) => getCardScore(card, currentSuit, trump))
		.reduce(
			(largestIndex, current, currentIndex, array) =>
				current > array[largestIndex] ? currentIndex : largestIndex,
			-Infinity
		);
};
