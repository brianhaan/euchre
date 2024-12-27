import type { Card } from './Card';

export type CardInHand = {
	card: Card;
	isPlayed: boolean;
};
type RoundHand = [CardInHand, CardInHand, CardInHand, CardInHand, CardInHand];
type RoundHandWithSwap = [CardInHand, CardInHand, CardInHand, CardInHand, CardInHand, CardInHand];
export type Hand = RoundHand | RoundHandWithSwap;
