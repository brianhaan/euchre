import type { TrickState } from '$lib/state/TrickState.svelte';
import type { Card, CardSuit } from './Card';
import type { RoundDeck } from './Deck';
import type { Hand } from './Hand';

export const RoundStatus = {
	Initializing: 0,
	Dealing: 1,
	Bidding: 2,
	Tricks: 3,
	Complete: 4
} as const;

export type Round = {
	id: number;
	status: (typeof RoundStatus)[keyof typeof RoundStatus];
	cardShowing?: Card;
	bids: boolean[];
	trump?: CardSuit;
	goingAlone: boolean;
	hands?: [Hand, Hand, Hand, Hand];
	tricks: TrickState[];
	deck?: RoundDeck;
};
