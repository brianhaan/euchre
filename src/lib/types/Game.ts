import type { Player } from './Player';
import type { Round } from './Round';

export type Game = {
	id: number;
	players: [Player | undefined, Player | undefined, Player | undefined, Player | undefined];
	initialDealer: number;
	rounds: Round[];
};
