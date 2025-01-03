<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { GameStatus } from '$lib/types/Game';
	import type { Player } from '$lib/types/Player';
	import { RoundStatus } from '$lib/types/Round';
	import Score from './Score.svelte';
	import Bidding from './Bidding.svelte';
	import Deck from './Deck.svelte';
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
	{:else if game.status === GameStatus.Initializing}
		<Score {game} />
	{:else if round.status === RoundStatus.Initializing || round.status === RoundStatus.Bidding}
		<Bidding {game} />
	{:else if round.status === RoundStatus.Tricks}
		<Trick {game} {mainPlayer} />
	{/if}
</div>

<style>
	.board {
		border-color: rgba(255, 255, 255, 0.5);
		width: min(50dvh, 50vw);
		height: min(50dvh, 50vw);
		@media screen and (min-width: 640px) and (min-height: 640px) {
			width: min(35dvh, 35vw);
			height: min(35dvh, 35vw);
		}
		@media screen and (min-width: 960px) and (min-height: 960px) {
			width: min(30dvh, 30vw);
			height: min(30dvh, 30vw);
		}
	}
</style>
