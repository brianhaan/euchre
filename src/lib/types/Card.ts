export const Suit = {
	Hearts: 'H',
	Spades: 'S',
	Diamonds: 'D',
	Clubs: 'C'
} as const;

export const Value = {
	Ace: 5,
	King: 4,
	Queen: 3,
	Jack: 2,
	Ten: 1,
	Nine: 0
} as const;

export type CardSuit = (typeof Suit)[keyof typeof Suit];
export type CardValue = (typeof Value)[keyof typeof Value];
export type Card = {
	suit: CardSuit;
	value: CardValue;
};

export const ValueSymbol: Record<CardValue, string> = {
	5: 'A',
	4: 'K',
	3: 'Q',
	2: 'J',
	1: '10',
	0: '9'
} as const;

export const SuitEmoji: Record<CardSuit, string> = {
	H: '♥️',
	S: '♠️',
	D: '♦️',
	C: '♣️'
} as const;
