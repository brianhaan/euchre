<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { RoundStatus } from '$lib/types/Round';

	type Props = {
		game: GameState;
	};

	const { game }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
</script>

<div class="board">
	{#if !round || round.status === RoundStatus.Complete}
		<button onclick={() => game.startNewRound()}>Start New Round</button>
	{/if}
</div>

<style>
	.board {
		position: absolute;
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		inset: 0;
		margin-block: auto;
		margin-inline: auto;
		width: 25%;
		height: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
