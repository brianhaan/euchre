import { Action } from '$lib/types/Action';
import type { Game } from '$lib/types/Game';
import { RoundStatus } from '$lib/types/Round';

export const getCurrentAction = (game: Game) => {
	const round = game.rounds[game.rounds.length - 1];
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
};
