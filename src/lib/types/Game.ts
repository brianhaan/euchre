import type { RoundState } from '$lib/state/RoundState.svelte';
import type { Player } from './Player';

export const GameStatus = {
	Initializing: 0,
	Active: 1,
	Complete: 2
};

export type Game = {
	id: number;
	status: (typeof GameStatus)[keyof typeof GameStatus];
	scoreToWin: number;
	players: [Player, Player, Player, Player];
	initialDealer: number;
	rounds: RoundState[];
};
