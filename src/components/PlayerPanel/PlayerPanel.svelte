<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import type { Player } from '$lib/types/Player';
	import Card from '../Card.svelte';
	import PlayerHand from './PlayerHand.svelte';
	import PlayerInfo from './PlayerInfo.svelte';

	type Props = {
		player: Player;
		mainPlayer: Player['id'];
		game: GameState;
	};
	type Position = 'bottom' | 'left' | 'top' | 'right';

	const { player, mainPlayer, game }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const playerIndex = $derived(game.players.findIndex((p) => p.id === player.id));
	const currentPlayer = $derived(game.getCurrentPlayer());
	const dealer = $derived(game.getCurrentDealer());
	const position: Position = $derived.by(() => {
		const mainPlayerIndex = game.players.findIndex((p) => p.id === mainPlayer);
		const playerByMain = [
			...game.players.slice(mainPlayerIndex),
			...game.players.slice(0, mainPlayerIndex)
		];
		const index = playerByMain.findIndex((p) => p.id === player.id);
		return index === 0 ? 'bottom' : index === 1 ? 'left' : index === 2 ? 'top' : 'right';
	});
</script>

<div class="player-panel {position} absolute p-4">
	<div class="info-container"><PlayerInfo {player} {playerIndex} {dealer} {currentPlayer} /></div>
	<div class="hand-container">
		<PlayerHand {round} {position} {playerIndex} />
	</div>
</div>

<style>
	.player-panel {
		font-size: 24px;
		&.bottom {
			left: 0;
			right: 0;
			bottom: 0;
			width: min(50vh, 50vw);
			margin-inline: auto;
			border-bottom: 0;
			.hand-container {
				scale: 125%;
				transform: translateY(-20px);
			}
		}
		&.left {
			left: 0;
			top: 0;
			bottom: 0;
			height: min(50vh, 50vw);
			margin-block: auto;
			border-left: 0;
		}
		&.top {
			top: 0;
			left: 0;
			right: 0;
			width: min(50vh, 50vw);
			margin-inline: auto;
			border-top: 0;
		}
		&.right {
			right: 0;
			top: 0;
			bottom: 0;
			height: min(50vh, 50vw);
			margin-block: auto;
			border-right: 0;
		}
	}
</style>
