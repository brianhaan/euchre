<script lang="ts">
	import { GameState } from '$lib/state/GameState.svelte';
	import ActionDialog from '../components/ActionDialog.svelte';
	import Board from '../components/Board.svelte';
	import PlayerPanel from '../components/PlayerPanel/PlayerPanel.svelte';

	const game = new GameState();
	const mainPlayer = 0; // your player ID, or ID you are viewing as, at bottom of screen
	// const round = $derived(game.rounds[game.rounds.length - 1]);
	// const trick = $derived(round?.tricks[round.tricks.length - 1]);
	// const action = $derived(game.getCurrentAction());
	// const currentPlayer = $derived(game.getCurrentPlayer());
	// const dealer = $derived(game.getCurrentDealer());
	// const trickWinners = $derived(round?.getTrickWinners());
	// const score = $derived(game.getScore());
</script>

<main class="h-screen w-screen p-16">
	<div class="relative h-full w-full rounded-xl bg-[--bg-board] shadow-xl">
		<Board {game} />
		{#each game.players as player}
			<PlayerPanel {game} {player} {mainPlayer} />
			<ActionDialog />
		{/each}
	</div>
</main>

<style>
</style>
