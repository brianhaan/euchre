import type { Game } from '$lib/types/Game';

export const getCurrentDealer = (game: Game) => (game.initialDealer + game.rounds.length - 1) % 4;
