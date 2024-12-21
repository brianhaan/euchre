import type { Game } from '$lib/types/Game';
import { RoundStatus } from '$lib/types/Round';
import { getCurrentDealer } from './getCurrentDealer';

export const getCurrentPlayer = (game: Game) => {
	const round = game.rounds[game.rounds.length - 1];
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
		if (round.goingAlone) {
			const caller = (dealer + round.bids.length) % 4;
			return (caller + numCardsPlayed + (numCardsPlayed > 0 ? 2 : 1)) % 4;
		} else {
			return (dealer + 1 + numCardsPlayed) % 4;
		}
	}
};
