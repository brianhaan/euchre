import type { Game } from '$lib/types/Game';
import { RoundStatus } from '$lib/types/Round';
import { getCurrentDealer } from './getCurrentDealer';

export const getCurrentPlayer = (game: Game) => {
	const round = game.rounds[game.rounds.length - 1];
	const dealer = getCurrentDealer(game);
	if (round.status === RoundStatus.Bidding) {
		if (round.bids.length <= 4 && round.bids[round.bids.length - 1]) {
			// Dealer swapping card
			return dealer;
		}
		return (dealer + round.bids.length + 1) % 4;
	} else if (round.status === RoundStatus.Tricks) {
		// const
	}
};
