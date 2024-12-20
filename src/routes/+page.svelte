<script lang="ts">
	import { GameState } from '$lib/state/GameState.svelte';
	import Card from '../components/Card.svelte';

	const game = new GameState();
	let dealer = $derived((game.initialDealer + game.rounds.length) % 4);
	let round = $derived(game.rounds[game.rounds.length - 1]);
</script>

<div class="wrapper mb-6">
	<div class="flex justify-between">
		<div>
			<p>Round: {game.rounds.length}</p>
			<button onclick={() => game.startNewRound()}>Start Round</button>
		</div>
		{#if round.cardShowing}
			<div>
				<Card card={round.cardShowing} />
			</div>
		{/if}
	</div>
</div>

<div class="flex flex-col gap-4 lg:flex-row">
	{#each game.players as player, index}
		<div class="wrapper flex-1">
			<div class="flex min-h-16 justify-between gap-4">
				<p>
					Player {index + 1}: <strong>{player?.name ?? `Player ${index + 1}`}</strong>
				</p>
				{#if dealer === index}
					<p class="dealer h-fit">Dealer</p>
				{/if}
			</div>
			<div class="flex gap-1">
				{#each round?.hands?.[index] ?? [] as cardInHand}
					<Card card={cardInHand.card} />
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.wrapper {
		border: 1px solid;
		padding-inline: 20px;
		padding-block: 12px;
	}
	.dealer {
		color: blue;
		border: 3px dashed gold;
		padding: 3px 10px;
	}
</style>
