<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { RoundStatus } from '$lib/types/Round';
	import Bidding from './Bidding.svelte';
	import Trick from './Trick.svelte';

	type Props = {
		game: GameState;
	};

	const { game }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
</script>

<div class="board">
	{#if !round || round.status === RoundStatus.Complete}
		<button onclick={() => game.startNewRound()} class="text-xl">Start New Round</button>
	{:else if round.status === RoundStatus.Bidding}
		<Bidding {game} />
	{:else if round.status === RoundStatus.Tricks}
		<Trick />
	{/if}
</div>

<style>
	.board {
		position: absolute;
		z-index: 10;
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		inset: 0;
		margin-block: auto;
		margin-inline: auto;
		width: 30%;
		height: 30%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
