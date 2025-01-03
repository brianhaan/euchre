<script lang="ts">
	import type { RoundState } from '$lib/state/RoundState.svelte';
	import type { Position } from '$lib/utilities/getPlayerPosition';

	type Props = {
		round: RoundState;
		playerIndex: number;
		position: Position;
	};

	const { round, playerIndex, position }: Props = $props();
	const tricksWon = $derived.by(() => {
		return round.getTrickWinners().filter((winner) => winner === playerIndex);
	});
</script>

<div class="absolute bottom-2 left-0 right-0 top-0 flex sm:bottom-4">
	<div class="player-tricks relative mx-auto flex items-end justify-end {position}">
		<div class="flex flex-col gap-[2px] sm:gap-1 md:gap-1.5 lg:gap-2">
			{#each tricksWon}
				<div class="trick rounded-sm border border-black bg-blue-900 md:rounded-md"></div>
			{/each}
		</div>
	</div>
</div>

<style>
	.player-tricks {
		width: min(50dvh, 50vw);
		&.bottom {
			width: min(85dvh, 85vw);
			@media screen and (min-width: 640px) and (min-height: 640px) {
				width: min(70dvh, 70vw);
			}
			@media screen and (min-width: 960px) and (min-height: 960px) {
				width: min(73dvh, 73vw);
			}
		}
	}
	.trick {
		width: min(4dvh, 4vw);
		aspect-ratio: 14 / 9;
	}
</style>
