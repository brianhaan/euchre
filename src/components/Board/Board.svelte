<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import type { Player } from '$lib/types/Player';
	import { RoundStatus } from '$lib/types/Round';
	import Bidding from './Bidding.svelte';
	import Trick from './Trick.svelte';

	type Props = {
		game: GameState;
		mainPlayer: Player['id'];
	};

	const { game, mainPlayer }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
</script>

<div
	class="board absolute inset-0 z-50 mx-auto my-auto flex items-center justify-center rounded-lg border"
>
	{#if !round || round.status === RoundStatus.Complete}
		<button onclick={() => game.startNewRound()} class="text-xl">Start New Round</button>
	{:else if round.status === RoundStatus.Bidding}
		<Bidding {game} />
	{:else if round.status === RoundStatus.Tricks}
		<Trick {game} {mainPlayer} />
	{/if}
</div>

<style>
	.board {
		border-color: rgba(255, 255, 255, 0.5);
		width: min(50vh, 50vw);
		height: min(50vh, 50vw);
		@media screen and (min-width: 960px) and (min-height: 960px) {
			width: min(40vh, 40vw);
			height: min(40vh, 40vw);
		}
		@media screen and (min-width: 1280px) and (min-height: 1280px) {
			width: min(30vh, 30vw);
			height: min(30vh, 30vw);
		}
	}
</style>
