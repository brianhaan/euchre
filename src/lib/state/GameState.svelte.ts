import type { Game } from '$lib/types/Game';
import { RoundState } from './RoundState.svelte';

export class GameState implements Game {
	id = 0;
	players = $state([
		{ id: 0, name: 'Alice' },
		{ id: 1, name: 'Bob' },
		{ id: 2, name: 'Charles' },
		{ id: 3, name: 'Delores' }
	] as Game['players']);
	initialDealer = $state(Math.floor(Math.random() * 4));
	rounds = $state([new RoundState()]);

	startNewRound() {
		this.rounds.push(new RoundState());
	}
}
