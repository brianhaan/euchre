<script lang="ts">
	import { GameState } from '$lib/state/GameState.svelte';
	import { GameStatus } from '$lib/types/Game';
	import { RoundStatus } from '$lib/types/Round';
	import Board from '../components/Board/Board.svelte';
	import PlayerPanel from '../components/PlayerPanel/PlayerPanel.svelte';
	import Score from '../components/Score.svelte';
	import TrumpCard from '../components/TrumpCard.svelte';

	const game = new GameState();
	const mainPlayer = 0; // your player ID or ID you are viewing as at bottom of screen
	const round = $derived(game.rounds[game.rounds.length - 1]);

	// TODO
	// Animation - Show CardShowing flipping over when pass 4 times
	// Animation - Trump selected, moves to corner, move marker to maker
	// Animation - End of trick, show winner card, move cards to PlayerTrick
	// Animation - End of round: show winner, show adding to score, show EUCHRED if applicable
	// Animation - End of game
	// Don't allow game to continue when score reaches 10
	// Animation - Change buttons when going alone
</script>

<Board {game} {mainPlayer} />
{#if game.rounds.length}
	{#if game.status !== GameStatus.Initializing}
		<Score {game} />
	{/if}
	{#if round && round.status !== RoundStatus.Complete}
		<TrumpCard suit={round?.trump} />
	{/if}
{/if}
{#each game.players as player}
	<PlayerPanel {game} {player} {mainPlayer} />
{/each}

<!-- <button class="card-container" onclick={flipCard}>
	<div class="card {isFlipped ? 'flipped' : ''}">
		<div class="card-face card-front">Front</div>
		<div class="card-face card-back">Back</div>
	</div>
</button>

<style>
	.card-container {
		perspective: 1000px; /* Creates a 3D perspective */
		width: 150px;
		height: 200px;
	}

	.card {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d; /* Enables 3D flipping */
		transition: transform 0.6s ease-in-out; /* Smooth animation */
		transform: rotateY(0deg);
	}

	.card.flipped {
		transform: rotateY(180deg); /* Flip the card */
	}

	.card-face {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden; /* Hides the back face when flipped */
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		font-weight: bold;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	.card-front {
		background-color: #fff;
	}

	.card-back {
		background-color: #f00;
		transform: rotateY(180deg); /* Back face is flipped by default */
		color: white;
	}
</style> -->
