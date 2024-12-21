import type { Card, CardSuit } from './Card';
import type { Hand } from './Hand';
import type { Trick } from './Trick';

export const RoundStatus = {
	Bidding: 0,
	Tricks: 1,
	Complete: 2
} as const;

export type Round = {
	id: number;
	status: (typeof RoundStatus)[keyof typeof RoundStatus];
	cardShowing?: Card;
	bids: boolean[];
	trump?: CardSuit;
	goingAlone: boolean;
	hands?: [Hand, Hand, Hand, Hand];
	tricks: Trick[];
};
