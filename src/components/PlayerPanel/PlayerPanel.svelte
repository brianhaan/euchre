<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import type { Player } from '$lib/types/Player';
	import { RoundStatus } from '$lib/types/Round';
	import { getPlayerPosition } from '$lib/utilities/getPlayerPosition';
	import PlayerHand from './PlayerHand.svelte';
	import PlayerInfo from './PlayerInfo.svelte';
	import PlayerTricks from './PlayerTricks.svelte';

	type Props = {
		game: GameState;
		player: Player;
		mainPlayer: Player['id'];
		currentPlayer?: number;
	};

	const { game, player, mainPlayer, currentPlayer }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const playerIndex = $derived(game.players.findIndex((p) => p.id === player.id));
	const position = $derived(getPlayerPosition(player.id, game.players, mainPlayer));
	const maker = $derived(game.getCurrentMaker());
	const dealer = $derived(game.getCurrentDealer());
</script>

{#if round && round.status !== RoundStatus.Complete}
	<!-- TODO the check for currentPlayer === playerIndex can be removed when only controlling one player -->
	<div
		class="player-panel-wrapper {position} absolute inset-0 {currentPlayer === playerIndex
			? 'z-20'
			: ''}"
	>
		<div class="player-panel absolute bottom-0 w-full">
			<PlayerInfo {player} {playerIndex} {dealer} {maker} {position} {currentPlayer} />
			<div class="hand-wrapper mx-auto h-full">
				<PlayerHand {game} {position} {playerIndex} {dealer} />
			</div>
			<PlayerTricks {round} {playerIndex} />
		</div>
	</div>
{/if}

<style>
	.player-panel-wrapper {
		&.top {
			rotate: 180deg;
		}
		&.left {
			rotate: 90deg;
			transform: translateY(calc((100vw - 100vh) / 2));
		}
		&.right {
			rotate: -90deg;
			transform: translateY(calc((100vw - 100vh) / 2));
		}
		&.bottom {
			z-index: 10;
		}
	}
	.player-panel {
		height: min(20vh, 20vw);
	}

	.hand-wrapper {
		width: min(10vh, 10vw);
		scale: 0.9;
		transform: translateY(min(4vh, 4vh));
	}
	.bottom .hand-wrapper {
		scale: 1.2;
		transform: translateY(min(1.5vh, 1.5vh));
	}
</style>
