import type { RoundState } from '$lib/state/RoundState.svelte';
import type { Player } from './Player';

export type Game = {
	id: number;
	scoreToWin: number;
	players: [Player | undefined, Player | undefined, Player | undefined, Player | undefined];
	initialDealer: number;
	rounds: RoundState[];
};
