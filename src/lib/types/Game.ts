import type { RoundState } from '$lib/state/RoundState.svelte';
import type { Player } from './Player';

export type Game = {
	id: number;
	scoreToWin: number;
	players: [Player, Player, Player, Player];
	initialDealer: number;
	rounds: RoundState[];
};
