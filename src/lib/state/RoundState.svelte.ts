import type { Round } from '$lib/types/Round';
import { deal } from '$lib/utilities/deal';
import { shuffle } from '$lib/utilities/shuffle';

export class RoundState implements Round {
	id = 0;
	cardShowing = undefined as Round['cardShowing'];
	biddingRound = 0 as Round['biddingRound'];
	bidder = undefined as Round['bidder'];
	caller = undefined as Round['caller'];
	trump = undefined as Round['trump'];
	goingAlone = false;
	hands = undefined as Round['hands'];
	tricks = [] as Round['tricks'];

	constructor() {
		const piles = deal(shuffle());
		this.hands = piles.slice(0, 4) as Round['hands'];
		this.cardShowing = piles[4][0].card;
	}
}
