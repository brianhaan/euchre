<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import { Suit, SuitEmoji } from '$lib/types/Card';
	import Card from '../Card.svelte';

	const { game }: { game: GameState } = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const action = $derived(game.getCurrentAction());
	const playerNumber = $derived(game.getCurrentPlayer());
	let goingAlone = $state(false);
</script>

{#if action !== Action.SwapCard && action !== Action.PlayCard && action !== Action.Invalid}
	<div class="container h-full">
		<div class="flex h-full items-center justify-center p-4 pb-0">
			<div
				class="card-container flex items-center justify-center rounded-lg border-2 border-dashed p-1"
			>
				{#if round.cardShowing}
					<Card card={round.cardShowing} />
				{/if}
			</div>
		</div>
		<div class="flex flex-col justify-center gap-2 p-4 pb-0">
			{#each Object.entries(Suit) as [_, suit]}
				<button
					onclick={() => round.acceptBid(goingAlone, suit)}
					disabled={round.cardShowing && round.cardShowing.suit !== suit}
					class="bg-white">{SuitEmoji[suit]}</button
				>
			{/each}
			<label class="mt-1" for="going-alone"
				><input type="checkbox" id="going-alone" bind:checked={goingAlone} /> Going Alone?</label
			>
		</div>
		<div class="pass-container p-4 text-center">
			{#if action === Action.StickTheDealer}
				<div class="h-[46px] text-2xl">Dealer must choose a suit</div>
			{:else}
				<button onclick={() => round.passBid()} class=" bg-blue-300 text-black shadow-lg"
					>Pass</button
				>
			{/if}
		</div>
	</div>
{:else if action === Action.SwapCard && typeof playerNumber !== 'undefined'}
	<div class="flex items-center justify-center p-8 text-center text-2xl">
		Waiting for {game.players[playerNumber].name ?? `Player ${playerNumber + 1}`} to discard a card...
	</div>
{/if}

<style>
	.container {
		container-type: inline-size;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr auto;
	}
	.pass-container {
		grid-row: 2;
		grid-column: 1 / -1;
	}
	.card-container {
		aspect-ratio: 9 / 14;
		width: min(calc(50cqw * 9 / 14 - 10px), calc(50cqh * 9 / 14 - 10px));
	}
	button {
		width: 100%;
		border-radius: 10px;
		padding-inline: 16px;
		padding-block: 8px;
		font-size: 20px;
		font-weight: bold;
		&:disabled {
			background-color: rgba(180, 180, 180, 0.7);
			cursor: not-allowed;
		}
	}
	label {
		font-size: 20px;
		display: flex;
		align-items: center;
		gap: 10px;
		user-select: none;
		cursor: pointer;
	}
	input[type='checkbox'] {
		height: 20px;
		width: 20px;
		cursor: pointer;
	}
</style>
