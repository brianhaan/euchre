import type { Card } from './Card';

export type CardInHand = {
	card: Card;
	isPlayed: boolean;
};
export type Hand = [CardInHand, CardInHand, CardInHand, CardInHand, CardInHand];
