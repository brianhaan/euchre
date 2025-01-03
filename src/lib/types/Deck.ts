import { Suit, Value, type Card } from './Card';

export type Deck = Card[];
export const DECK: Card[] = [
	{ suit: Suit.Hearts, value: Value.Ace },
	{ suit: Suit.Hearts, value: Value.King },
	{ suit: Suit.Hearts, value: Value.Queen },
	{ suit: Suit.Hearts, value: Value.Jack },
	{ suit: Suit.Hearts, value: Value.Ten },
	{ suit: Suit.Hearts, value: Value.Nine },
	{ suit: Suit.Spades, value: Value.Ace },
	{ suit: Suit.Spades, value: Value.King },
	{ suit: Suit.Spades, value: Value.Queen },
	{ suit: Suit.Spades, value: Value.Jack },
	{ suit: Suit.Spades, value: Value.Ten },
	{ suit: Suit.Spades, value: Value.Nine },
	{ suit: Suit.Diamonds, value: Value.Ace },
	{ suit: Suit.Diamonds, value: Value.King },
	{ suit: Suit.Diamonds, value: Value.Queen },
	{ suit: Suit.Diamonds, value: Value.Jack },
	{ suit: Suit.Diamonds, value: Value.Ten },
	{ suit: Suit.Diamonds, value: Value.Nine },
	{ suit: Suit.Clubs, value: Value.Ace },
	{ suit: Suit.Clubs, value: Value.King },
	{ suit: Suit.Clubs, value: Value.Queen },
	{ suit: Suit.Clubs, value: Value.Jack },
	{ suit: Suit.Clubs, value: Value.Ten },
	{ suit: Suit.Clubs, value: Value.Nine }
] as const;

export type RoundDeck = Array<{
	card: Card;
	isShuffled: boolean;
}>;
