import { type Card } from '$lib/types/Card';
import { RoundStatus, type Round } from '$lib/types/Round';
import { areCardsEqual } from '$lib/utilities/areCardsEqual';
import { deal } from '$lib/utilities/deal';
import { shuffle } from '$lib/utilities/shuffle';
import { TrickState } from './TrickState.svelte';

export class RoundState implements Round {
	id = 0;
	status = $state(RoundStatus.Bidding) as Round['status'];
	cardShowing = $state(undefined) as Round['cardShowing'];
	bids = $state([]) as Round['bids'];
	trump = $state(undefined) as Round['trump'];
	goingAlone = $state(false);
	hands = $state(undefined) as Round['hands'];
	tricks = $state([]) as Round['tricks'];

	constructor() {
		const piles = deal(shuffle());
		this.hands = piles.slice(0, 4) as Round['hands'];
		this.cardShowing = piles[4][0].card;
	}

	passBid() {
		this.bids.push(false);
		if (this.bids.length === 4) {
			this.cardShowing = undefined;
		}
	}

	acceptBid(goingAlone: Round['goingAlone'], trump?: Round['trump']) {
		this.bids.push(true);
		this.goingAlone = goingAlone;
		if (this.bids.length > 4) {
			this.trump = trump;
			this.startTrick();
		} else {
			this.trump = this.cardShowing?.suit;
			if (goingAlone && this.bids.length === 2) {
				// Going Alone and Partner is dealer - no swap necessary
				this.startTrick();
			}
		}
	}

	swapCard(playerNumber: number, card: Card) {
		const hand = this.hands?.[playerNumber];
		if (hand && this.cardShowing) {
			const cardToSwap = hand.findIndex((handCard) => areCardsEqual(handCard.card, card));
			hand[cardToSwap].card.suit = this.cardShowing.suit;
			hand[cardToSwap].card.value = this.cardShowing.value;
		}
		this.startTrick();
	}

	playCard(playerNumber: number, card: Card) {
		const hand = this.hands?.[playerNumber];
		const trick = this.tricks[this.tricks.length - 1];
		if (hand && trick) {
			const cardToPlay = hand.findIndex((handCard) => areCardsEqual(handCard.card, card));
			if (typeof cardToPlay !== 'undefined') {
				hand[cardToPlay].isPlayed = true;
				trick.cards[playerNumber] = hand[cardToPlay].card;
			}

			const numCardsPlayed = trick.getNumCardsPlayed();
			if (numCardsPlayed === 4 || (this.goingAlone && numCardsPlayed === 3)) {
				this.finishTrick();
			}
		}
	}

	startTrick() {
		this.cardShowing = undefined;
		this.status = RoundStatus.Tricks;
		this.tricks.push(new TrickState());
	}

	finishTrick() {
		if (this.tricks.length === 5) {
			this.status = RoundStatus.Complete;
		} else {
			this.startTrick();
		}
	}
}
