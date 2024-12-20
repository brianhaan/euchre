import type { Card, CardSuit } from './Card';
import type { Hand } from './Hand';
import type { Player } from './Player';
import type { Trick } from './Trick';

export type Round = {
	id: number;
	cardShowing?: Card;
	biddingRound: 0 | 1;
	bidder?: Player['id'];
	caller?: Player['id'];
	trump?: CardSuit;
	goingAlone: boolean;
	hands?: [Hand, Hand, Hand, Hand];
	tricks: Trick[];
};
