import { Action } from '$lib/types/Action';
import type { Game } from '$lib/types/Game';
import { RoundStatus } from '$lib/types/Round';
import { RoundState } from './RoundState.svelte';

export class GameState implements Game {
	id = 0;
	scoreToWin = 10;
	players = $state([
		{ id: 0, name: 'Alice' },
		{ id: 1, name: 'Bob' },
		{ id: 2, name: 'Charles' },
		{ id: 3, name: 'Delores' }
	] as Game['players']);
	initialDealer = Math.floor(Math.random() * 4);
	rounds = $state([]) as RoundState[];

	startNewRound() {
		this.rounds.push(new RoundState());
	}

	getCurrentDealer() {
		return (this.initialDealer + this.rounds.length - 1) % 4;
	}

	getCurrentPlayer() {
		const round = this.rounds[this.rounds.length - 1];
		if (!round) {
			return 0;
		}
		const dealer = this.getCurrentDealer();
		if (round.status === RoundStatus.Bidding) {
			const isActionSwapCard = round.bids.length <= 4 && round.bids[round.bids.length - 1];
			if (isActionSwapCard) {
				return dealer;
			}
			return (dealer + 1 + round.bids.length) % 4;
		} else if (round.status === RoundStatus.Tricks) {
			const trick = round.tricks[round.tricks.length - 1];
			const numCardsPlayed = trick.getNumCardsPlayed();
			if (round.tricks.length === 1) {
				// first trick
				if (round.goingAlone) {
					// player to left of caller starts
					const caller = (dealer + round.bids.length) % 4;
					return (caller + numCardsPlayed + (numCardsPlayed > 0 ? 2 : 1)) % 4;
				} else {
					// player to left of dealer starts
					return (dealer + 1 + numCardsPlayed) % 4;
				}
			} else {
				// winner of previous trick starts
				const winner = round.tricks[round.tricks.length - 2].getWinner(round.trump!);
				if (round.goingAlone) {
					const caller = dealer + round.bids.length;
					const inactivePlayer = (caller + 2) % 4;
					let nextPlayer = winner;
					for (let i = 0; i < numCardsPlayed; i++) {
						nextPlayer = (nextPlayer + 1) % 4;
						if (nextPlayer === inactivePlayer) {
							nextPlayer++;
						}
					}
					return nextPlayer % 4;
				} else {
					return (winner + numCardsPlayed) % 4;
				}
			}
		}
	}

	getCurrentAction() {
		const round = this.rounds[this.rounds.length - 1];
		if (!round) {
			return Action.Invalid;
		}
		if (round.status === RoundStatus.Bidding) {
			if (round.bids.length > 0 && round.bids[round.bids.length - 1]) {
				return Action.SwapCard;
			} else if (round.bids.length < 7) {
				if (round.bids.length >= 4) {
					return Action.PassOrAcceptWithTrump;
				} else {
					return Action.PassOrAccept;
				}
			} else {
				return Action.StickTheDealer;
			}
		} else if (round.status === RoundStatus.Tricks) {
			return Action.PlayCard;
		}
	}

	getScore() {
		const teams = [0, 0];
		this.rounds.forEach((round, roundIndex) => {
			if (round.status === RoundStatus.Complete) {
				const dealer = this.initialDealer + roundIndex;
				const maker = (dealer + round.bids.length) % 4;
				const makerTeamIndex = maker === 0 || maker === 2 ? 0 : 1;
				let numTricksWon = 0;
				round.getTrickWinners().forEach((winner) => {
					const winnerTeamIndex = winner === 0 || winner === 2 ? 0 : 1;
					if (makerTeamIndex === winnerTeamIndex) {
						numTricksWon++;
					}
				});
				if (numTricksWon === 5) {
					teams[makerTeamIndex] = teams[makerTeamIndex] + (round.goingAlone ? 4 : 2);
				} else if (numTricksWon > 2) {
					teams[makerTeamIndex] = teams[makerTeamIndex] + 1;
				} else {
					const defenderTeamIndex = (makerTeamIndex + 1) % 2;
					teams[defenderTeamIndex] = teams[defenderTeamIndex] + 2;
				}
			}
		});
		return teams;
	}
}
