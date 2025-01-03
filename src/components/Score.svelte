<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';

	const { game }: { game: GameState } = $props();
	const score = $derived(game.getScore());
</script>

<div class="scoreboard absolute left-0 top-0 m-2 rounded-lg p-2 text-sm md:m-4 md:p-4 md:text-xl">
	{score[0]} - {score[1]}
</div>

<style>
	.scoreboard {
		view-transition-name: scoreboard;
		border: 1px solid rgba(255, 255, 255, 0.5);
	}
</style>
