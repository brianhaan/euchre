import type { Card } from '$lib/types/Card';
import type { CardInHand, Hand } from '$lib/types/Hand';

type Piles = [Hand, Hand, Hand, Hand, CardInHand[]];
export const deal = (deck: Card[]): Piles => {
	const piles = [[], [], [], [], []] as CardInHand[][];
	let currentPile = 0;
	deck.forEach((card) => {
		piles[currentPile].push({ card, isPlayed: false });
		currentPile = (currentPile + 1) % 5;
	});
	return piles as Piles;
};
