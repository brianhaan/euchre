<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';

	type Props = {
		game: GameState;
	};

	const { game }: Props = $props();
	const score = $derived(game.getScore());
</script>

<div
	class="scoreboard flex w-full flex-col gap-2 p-2 text-center text-sm sm:text-base md:p-4 md:text-lg lg:gap-4 lg:text-xl"
>
	<div class="flex flex-row">
		<div class="flex-1">
			<div>{game.players[0].name ?? `Player 1`}</div>
			<div>{game.players[2].name ?? `Player 3`}</div>
		</div>
		<div class="flex-1">
			<div>{game.players[1].name ?? `Player 2`}</div>
			<div>{game.players[3].name ?? `Player 4`}</div>
		</div>
	</div>
	<div class="flex flex-row">
		<div class="flex flex-1 justify-center">
			<div
				class="w-1/2 bg-white p-2 py-4 text-xl font-bold text-black sm:text-2xl md:p-4 md:py-8 md:text-3xl"
			>
				{score[0]}
			</div>
		</div>
		<div class="flex flex-1 justify-center">
			<div
				class="w-1/2 bg-white p-2 py-4 text-xl font-bold text-black sm:text-2xl md:p-4 md:py-8 md:text-3xl"
			>
				{score[1]}
			</div>
		</div>
	</div>
</div>

<style>
	.scoreboard {
		view-transition-name: scoreboard;
	}
</style>
