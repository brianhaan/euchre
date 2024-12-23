<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import type { Player } from '$lib/types/Player';
	import { RoundStatus } from '$lib/types/Round';
	import { getPlayerPosition } from '$lib/utilities/getPlayerPosition';
	import CurrentPlayerIndicator from './CurrentPlayerIndicator.svelte';
	import DealerButton from './DealerButton.svelte';
	import PlayerHand from './PlayerHand.svelte';
	import PlayerName from './PlayerName.svelte';

	type Props = {
		player: Player;
		mainPlayer: Player['id'];
		game: GameState;
	};

	const { player, mainPlayer, game }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const playerIndex = $derived(game.players.findIndex((p) => p.id === player.id));
	const currentPlayer = $derived(game.getCurrentPlayer());
	const dealer = $derived(game.getCurrentDealer());
	const position = $derived(getPlayerPosition(player.id, game.players, mainPlayer));
</script>

{#if round && round.status !== RoundStatus.Complete}
	<!-- TODO the check for currentPlayer === playerIndex can be removed when only controlling one player -->
	<div
		class="player-panel-wrapper {position} absolute inset-0 {currentPlayer === playerIndex
			? 'z-10'
			: ''}"
	>
		<div class="player-panel absolute">
			<PlayerName {player} {playerIndex} {position} />
			<DealerButton {dealer} {playerIndex} />
			<CurrentPlayerIndicator {currentPlayer} {playerIndex} />
			<div class="hand-wrapper mx-auto h-full">
				<PlayerHand {game} {position} {playerIndex} {dealer} />
			</div>
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
		bottom: 0;
		width: 100%;
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
