import { withTimeout } from '$lib/animation/withTimeout';
import { withTransition } from '$lib/animation/withTransition';
import { type Card } from '$lib/types/Card';
import type { RoundDeck } from '$lib/types/Deck';
import type { Hand } from '$lib/types/Hand';
import { RoundStatus, type Round } from '$lib/types/Round';
import { areCardsEqual } from '$lib/utilities/areCardsEqual';
import { deal } from '$lib/utilities/deal';
import { isCardInSuit } from '$lib/utilities/isCardInSuit';
import { isLeftBower } from '$lib/utilities/isLeftBower';
import { shuffle } from '$lib/utilities/shuffle';
import { TrickState } from './TrickState.svelte';

export class RoundState implements Round {
	id = 0;
	status = $state(RoundStatus.Initializing) as Round['status'];
	cardShowing = $state(undefined) as Round['cardShowing'];
	bids = $state([]) as Round['bids'];
	trump = $state(undefined) as Round['trump'];
	goingAlone = $state(false);
	hands = $state(undefined) as Round['hands'];
	tricks = $state([]) as Round['tricks'];
	deck = $state(undefined) as Round['deck'];

	private isAnimating = false;
	private trumpToSet: Round['trump'];
	private cardWasShowing: Round['cardShowing'];

	async deal(dealer: number) {
		this.deck = shuffle().map((card) => ({
			card,
			isShuffled: false
		}));

		// "shuffle"
		for (const cardInDeck of this.deck!) {
			await withTimeout(100, () => {
				cardInDeck.isShuffled = true;
			});
		}

		// deal
		await withTimeout(1500);
		this.hands = [[], [], [], []];
		let current = (dealer + 1) % 4;
		const deal = (x: 2 | 3) => async () => {
			const dealt = this.deck!.splice(0, x);
			this.hands![current].push(
				...dealt.map((cardInDeck) => ({
					card: cardInDeck.card,
					isPlayed: false
				}))
			);
			current = (current + 1) % 4;
		};
		const deals = [deal(3), deal(3), deal(3), deal(3), deal(2), deal(2), deal(2), deal(2)];
		for (const dealFn of deals) {
			await withTransition(() => {
				dealFn();
			});
		}

		// flip card
		await withTimeout(500);
		this.status = RoundStatus.Bidding;
		await withTimeout(500, () => {
			this.cardShowing = this.deck![0].card;
		});
	}

	passBid() {
		this.bids.push(false);
		if (this.bids.length === 4) {
			this.cardShowing = undefined;
		}
	}

	acceptBid(goingAlone: Round['goingAlone'], dealer: number, trump?: Round['trump']) {
		withTransition(() => {
			this.bids.push(true);
			this.goingAlone = goingAlone;
			if (this.bids.length > 4) {
				this.trumpToSet = trump;
				this.startTrick();
			} else {
				this.trumpToSet = this.cardShowing?.suit;
				this.cardWasShowing = this.cardShowing;
				this.cardShowing = undefined;
				const dealerHand = this.hands?.[dealer];
				if (dealerHand) {
					dealerHand.push({ isPlayed: false, card: this.cardWasShowing! });
				}
				if (goingAlone && this.bids.length === 2) {
					// Going Alone and partner is dealer - no swap necessary
					this.startTrick();
				}
			}
		});
	}

	swapCard(playerNumber: number, card: Card) {
		if (this.hands?.[playerNumber] && this.cardWasShowing) {
			this.hands[playerNumber] = this.hands[playerNumber].filter(
				(handCard) => !areCardsEqual(handCard.card, card)
			) as Hand;
		}
		this.startTrick();
	}

	canCardBePlayed(playerNumber: number, card: Card) {
		const trick = this.tricks[this.tricks.length - 1];
		if (!trick) {
			return true;
		}
		if (trick.getNumCardsPlayed() === 0 || isCardInSuit(card, trick.suit, this.trump)) {
			return true;
		} else {
			const hand = this.hands?.[playerNumber];
			if (
				hand &&
				!hand.find(
					(handCard) => isCardInSuit(handCard.card, trick.suit, this.trump) && !handCard.isPlayed
				)
			) {
				return true;
			}
		}
		return false;
	}

	playCard(playerNumber: number, card: Card) {
		if (this.isAnimating) return;
		if (!this.canCardBePlayed(playerNumber, card)) {
			throw new Error('Card cannot be played');
		}

		const hand = this.hands?.[playerNumber];
		const trick = this.tricks[this.tricks.length - 1];
		withTransition(() => {
			if (hand && trick) {
				const cardToPlay = hand.findIndex((handCard) => areCardsEqual(handCard.card, card));
				if (typeof cardToPlay !== 'undefined') {
					hand[cardToPlay].isPlayed = true;
					trick.playCard(playerNumber, hand[cardToPlay].card, isLeftBower(card, this.trump!));
				}
			}
		}).then(() => {
			const numCardsPlayed = trick.getNumCardsPlayed();
			if (numCardsPlayed === 4 || (this.goingAlone && numCardsPlayed === 3)) {
				this.finishTrick();
			}
		});
	}

	getTrickWinners() {
		return this.tricks.map((trick) => {
			const numCardsPlayed = trick.getNumCardsPlayed();
			if (
				!this.trump ||
				(this.goingAlone && numCardsPlayed < 3) ||
				(!this.goingAlone && numCardsPlayed < 4)
			) {
				return;
			}
			return trick.getWinner(this.trump);
		});
	}

	private startTrick() {
		this.isAnimating = true;
		setTimeout(() => {
			withTransition(() => {
				this.trump = this.trumpToSet;
				this.status = RoundStatus.Tricks;
				this.tricks.push(new TrickState());
				this.isAnimating = false;
			});
		}, 1000);
	}

	private finishTrick() {
		if (this.tricks.length === 5) {
			this.isAnimating = true;
			setTimeout(() => {
				this.status = RoundStatus.Complete;
				this.isAnimating = false;
			}, 1000);
		} else {
			this.startTrick();
		}
	}
}
