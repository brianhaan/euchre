<script lang="ts">
	import type { Player } from '$lib/types/Player';
	import type { Position } from '$lib/utilities/getPlayerPosition';

	type Props = {
		player: Player;
		playerIndex: number;
		dealer: number;
		maker?: number;
		currentPlayer?: number;
		position: Position;
	};

	const { player, playerIndex, dealer, maker, currentPlayer, position }: Props = $props();
</script>

<div class="player-info absolute bottom-4 left-0 right-0 top-0 {position} flex justify-start">
	<div class="flex w-40 flex-col-reverse items-end justify-start gap-2">
		<div class="player-name relative">
			<div class="max-w-40 truncate text-2xl">{player.name ?? `Player ${playerIndex + 1}`}</div>
			{#if playerIndex === currentPlayer}
				<span class="current-player absolute top-0 z-30 text-4xl">➡️</span>
			{/if}
		</div>
		{#if dealer === playerIndex || maker === playerIndex}
			<div class="buttons flex flex-row items-center gap-1">
				<div
					class="relative"
					aria-label="Maker"
					title="Maker"
					style="visibility: {maker === playerIndex ? 'visible' : 'hidden'}"
				>
					<div class="flex items-center justify-center text-5xl">⚪</div>
					<div class="absolute inset-0 flex items-center justify-center text-3xl">🔴</div>
				</div>
				<div
					class="relative"
					aria-label="Dealer"
					title="Dealer"
					style="visibility: {dealer === playerIndex ? 'visible' : 'hidden'}"
				>
					<div class="flex items-center justify-center text-5xl">🔵</div>
					<div class="absolute inset-0 flex items-center justify-center text-3xl">🟡</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.player-info {
		padding-left: min(18vh, 18vw);
		&.bottom {
			padding-left: min(12vh, 12vw);
		}
	}
	.top .player-name {
		rotate: 180deg;
	}
	:not(.top) .current-player {
		left: -48px;
	}
	.top .current-player {
		right: -48px;
		rotate: 180deg;
	}
</style>
