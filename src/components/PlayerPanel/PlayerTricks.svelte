<script lang="ts">
	import type { RoundState } from '$lib/state/RoundState.svelte';

	type Props = {
		round: RoundState;
		playerIndex: number;
	};

	const { round, playerIndex }: Props = $props();
	const tricksWon = $derived.by(() => {
		return round.getTrickWinners().filter((winner) => winner === playerIndex);
	});
</script>

<div class="player-tricks absolute bottom-4 left-0 right-0 top-0 flex items-end justify-end">
	<div class="relative">
		<div class="flex flex-col gap-2">
			{#each tricksWon}
				<div class="trick rounded border border-black bg-blue-900"></div>
			{/each}
		</div>
	</div>
</div>

<style>
	.player-tricks {
		padding-right: min(35vh, 35vw);
	}
	.trick {
		width: min(3.5vh, 3.5vw);
		aspect-ratio: 14 / 9;
	}
</style>
