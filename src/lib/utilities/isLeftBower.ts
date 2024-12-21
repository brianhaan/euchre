import { Suit, Value, type Card, type CardSuit } from '$lib/types/Card';

export const LeftBowerMap = {
	[Suit.Clubs]: Suit.Spades,
	[Suit.Diamonds]: Suit.Hearts,
	[Suit.Hearts]: Suit.Diamonds,
	[Suit.Spades]: Suit.Clubs
};

export const isLeftBower = (card: Card, trump: CardSuit) =>
	card.value === Value.Jack && LeftBowerMap[card.suit] === trump;
