import { Action } from '$lib/types/Action';
import type { Game } from '$lib/types/Game';
import { RoundStatus } from '$lib/types/Round';
import { getCurrentPlayer } from './getCurrentPlayer';

export const getCurrentAction = (game: Game) => {
	const round = game.rounds[game.rounds.length - 1];
	let action: (typeof Action)[keyof typeof Action] | undefined = undefined;
	if (round.status === RoundStatus.Bidding) {
		if (round.bids.length > 0 && round.bids[round.bids.length - 1]) {
			action = Action.SwapCard;
		} else if (round.bids.length < 7) {
			if (round.bids.length >= 4) {
				action = Action.PassOrAcceptWithTrump;
			} else {
				action = Action.PassOrAccept;
			}
		} else {
			action = Action.StickTheDealer;
		}
	} else if (round.status === RoundStatus.Tricks) {
		action = Action.PlayCard;
	}
	return { action, player: getCurrentPlayer(game) };
};
