import type { CardSuit } from '$lib/types/Card';
import type { Trick } from '$lib/types/Trick';
import { getCardScore } from '$lib/utilities/getCardScore';

export class TrickState implements Trick {
	id = 0;
	cards = $state([undefined, undefined, undefined, undefined]) as Trick['cards'];

	getNumCardsPlayed() {
		return this.cards
			.map((card) => (card ? 1 : 0) as number)
			.reduce((acc, value) => acc + value, 0);
	}

	getWinner(currentSuit: CardSuit, trump: CardSuit) {
		return this.cards
			.map((card) => getCardScore(card, currentSuit, trump))
			.reduce(
				(largestIndex, current, currentIndex, array) =>
					current > array[largestIndex] ? currentIndex : largestIndex,
				-Infinity
			);
	}
}
