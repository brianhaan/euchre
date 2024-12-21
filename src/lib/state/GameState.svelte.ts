import type { Game } from '$lib/types/Game';
import { RoundStatus } from '$lib/types/Round';
import { RoundState } from './RoundState.svelte';

export class GameState implements Game {
	id = 0;
	scoreToWin = 10;
	players = $state([
		{ id: 0, name: 'Alice' },
		{ id: 1, name: 'Bob' },
		{ id: 2, name: 'Charles' },
		{ id: 3, name: 'Delores' }
	] as Game['players']);
	initialDealer = Math.floor(Math.random() * 4);
	rounds = $state([]) as RoundState[];

	startNewRound() {
		this.rounds.push(new RoundState());
	}

	getScore() {
		const teams = [0, 0];
		this.rounds.forEach((round, roundIndex) => {
			if (round.status === RoundStatus.Complete) {
				const dealer = this.initialDealer + roundIndex;
				const maker = (dealer + round.bids.length) % 4;
				const makerTeamIndex = maker === 0 || maker === 2 ? 0 : 1;
				let numTricksWon = 0;
				round.getTrickWinners().forEach((winner) => {
					const winnerTeamIndex = winner === 0 || winner === 2 ? 0 : 1;
					if (makerTeamIndex === winnerTeamIndex) {
						numTricksWon++;
					}
				});
				if (numTricksWon === 5) {
					teams[makerTeamIndex] = teams[makerTeamIndex] + (round.goingAlone ? 4 : 2);
				} else if (numTricksWon > 2) {
					teams[makerTeamIndex] = teams[makerTeamIndex] + 1;
				} else {
					const defenderTeamIndex = (makerTeamIndex + 1) % 2;
					teams[defenderTeamIndex] = teams[defenderTeamIndex] + 2;
				}
			}
		});
		return teams;
	}
}
