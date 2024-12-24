<script lang="ts">
	import { GameState } from '$lib/state/GameState.svelte';
	import { RoundStatus } from '$lib/types/Round';
	import Board from '../components/Board/Board.svelte';
	import PlayerPanel from '../components/PlayerPanel/PlayerPanel.svelte';
	import Score from '../components/Score.svelte';
	import TrumpCard from '../components/TrumpCard.svelte';

	const game = new GameState();
	const mainPlayer = 1; // your player ID or ID you are viewing as at bottom of screen
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const currentPlayer = $derived(game.getCurrentPlayer());
</script>

<Board {game} {mainPlayer} />
{#if game.rounds.length}
	<Score {game} />
	{#if round && round.status !== RoundStatus.Complete}
		<TrumpCard suit={round?.trump} />
	{/if}
{/if}
{#each game.players as player}
	<PlayerPanel {game} {player} {mainPlayer} {currentPlayer} />
{/each}
