<script lang="ts">
	import { GameState } from '$lib/state/GameState.svelte';
	import { RoundStatus } from '$lib/types/Round';
	import Board from '../components/Board/Board.svelte';
	import PlayerPanel from '../components/PlayerPanel/PlayerPanel.svelte';
	import Score from '../components/Score.svelte';
	import TrumpCard from '../components/TrumpCard.svelte';

	const game = new GameState();
	const mainPlayer = 0; // your player ID or ID you are viewing as at bottom of screen
	const round = $derived(game.rounds[game.rounds.length - 1]);

	// TODO
	// Double-click to play on mobile
	// Animation - Card playing from hand to board
	// Animation - Show CardShowing moving to player's hand
	// Animation - Show CardShowing flipping over when pass 4 times
	// Animation - Trump selected, moves to corner, move marker to maker
	// Animation - End of trick, show winner card, move cards to PlayerTrick
	// Animation - End of round: show winner, show adding to score, show EUCHRED if applicable
	// Animation - End of game
	// Don't allow game to continue when score reaches 10
	// Animation - Start of round? Shuffle?
	// Animation - Start of game? Show score and move to corner
	// Animation - Change buttons when going alone
	// More indicators when going alone that the partner isn't playing
</script>

<Board {game} {mainPlayer} />
{#if game.rounds.length}
	<Score {game} />
	{#if round && round.status !== RoundStatus.Complete}
		<TrumpCard suit={round?.trump} />
	{/if}
{/if}
{#each game.players as player}
	<PlayerPanel {game} {player} {mainPlayer} />
{/each}
