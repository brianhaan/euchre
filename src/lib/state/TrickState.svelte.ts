import { Suit, type Card, type CardSuit } from '$lib/types/Card';
import type { Trick } from '$lib/types/Trick';
import { getCardScore } from '$lib/utilities/getCardScore';
import { LeftBowerMap } from '$lib/utilities/isLeftBower';

export class TrickState implements Trick {
	id = 0;
	cards = $state([undefined, undefined, undefined, undefined]) as Trick['cards'];
	suit = $state(Suit.Hearts) as Trick['suit'];

	getNumCardsPlayed() {
		return this.cards
			.map((card) => (card ? 1 : 0) as number)
			.reduce((acc, value) => acc + value, 0);
	}

	playCard(playerNumber: number, card: Card, isLeftBower: boolean) {
		if (this.getNumCardsPlayed() === 0) {
			this.suit = isLeftBower ? LeftBowerMap[card.suit] : card.suit;
		}
		this.cards[playerNumber] = card;
	}

	getWinner(trump: CardSuit) {
		return this.cards
			.map((card) => getCardScore(card, this.suit, trump))
			.reduce(
				(largestIndex, current, currentIndex, array) =>
					current > array[largestIndex] ? currentIndex : largestIndex,
				0
			);
	}
}
