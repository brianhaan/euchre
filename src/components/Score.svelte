<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';

	const { game }: { game: GameState } = $props();
	const score = $derived(game.getScore());
</script>

<div class="scoreboard absolute left-4 top-4 p-4 text-xl">
	{score[0]} - {score[1]}
</div>

<style>
	.scoreboard {
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 10px;
	}

	td {
		padding-inline-start: 28px;
		text-align: right;
	}
</style>
