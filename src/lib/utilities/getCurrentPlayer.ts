import type { Game } from '$lib/types/Game';
import { RoundStatus } from '$lib/types/Round';
import { getCurrentDealer } from './getCurrentDealer';

export const getCurrentPlayer = (game: Game) => {
	const round = game.rounds[game.rounds.length - 1];
	if (!round) {
		return 0;
	}
	const dealer = getCurrentDealer(game);
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
};

// 5. Fix going alone
