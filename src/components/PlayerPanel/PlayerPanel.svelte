<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import type { Player } from '$lib/types/Player';
	import { RoundStatus } from '$lib/types/Round';
	import { getPlayerPosition } from '$lib/utilities/getPlayerPosition';
	import CurrentPlayerIndicator from './CurrentPlayerIndicator.svelte';
	import InactiveHand from './InactiveHand.svelte';
	import PlayerHand from './PlayerHand.svelte';
	import PlayerInfo from './PlayerInfo.svelte';
	import PlayerTricks from './PlayerTricks.svelte';

	type Props = {
		game: GameState;
		player: Player;
		mainPlayer: Player['id'];
	};

	const { game, player, mainPlayer }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const playerIndex = $derived(game.players.findIndex((p) => p.id === player.id));
	const currentPlayer = $derived(game.getCurrentPlayer());
	const maker = $derived(game.getCurrentMaker());
	const dealer = $derived(game.getCurrentDealer());
	const position = $derived(getPlayerPosition(player.id, game.players, mainPlayer));
</script>

{#if round && round.status !== RoundStatus.Complete}
	<!-- TODO the check for currentPlayer === playerIndex can be removed when only controlling one player -->
	<div
		class="player-panel-wrapper {position} absolute inset-0 {currentPlayer === playerIndex
			? 'z-20'
			: ''}"
	>
		<div class="player-panel absolute bottom-0 w-full">
			<PlayerInfo {player} {playerIndex} {dealer} {maker} {position} />
			{#if round?.status === RoundStatus.Tricks && round.goingAlone && typeof maker !== 'undefined' && playerIndex === (maker + 2) % 4}
				<InactiveHand {position} />
			{:else}
				<PlayerTricks {round} {playerIndex} {position} />
				<CurrentPlayerIndicator {playerIndex} {currentPlayer} {position} />
				<div class="hand-wrapper mx-auto h-full">
					<PlayerHand {game} {position} {playerIndex} {currentPlayer} {dealer} />
				</div>
			{/if}
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
			transform: translateY(calc((100vw - 100dvh) / 2));
		}
		&.right {
			rotate: -90deg;
			transform: translateY(calc((100vw - 100dvh) / 2));
		}
		&.bottom {
			z-index: 10;
		}
	}
	.player-panel {
		height: min(20dvh, 20vw);
	}

	.hand-wrapper {
		scale: 0.6;
		transform: translateY(min(4dvh, 4vw));
		width: min(24dvh, 24vw);
		@media screen and (min-width: 640px) and (min-height: 640px) {
			scale: 0.8;
			transform: translateY(min(8dvh, 8vw));
			width: min(14dvh, 14vw);
		}
		@media screen and (min-width: 960px) and (min-height: 960px) {
			transform: translateY(min(10dvh, 10vw));
			width: min(10dvh, 10vw);
		}
	}
	.bottom .hand-wrapper {
		scale: 1.2;
		transform: translateY(max(-3dvh, -3vw));
		@media screen and (min-width: 640px) and (min-height: 640px) {
			transform: translateY(min(5dvh, 5vw));
		}
		@media screen and (min-width: 960px) and (min-height: 960px) {
			scale: 1.3;
			transform: translateY(min(8dvh, 8vw));
		}
	}
</style>
