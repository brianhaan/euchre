<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import { Suit } from '$lib/types/Card';
	import { RoundStatus } from '$lib/types/Round';
	import Card from '../Card.svelte';
	import BiddingButton from './BiddingButton.svelte';
	import Deck from './Deck.svelte';

	const { game }: { game: GameState } = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const action = $derived(game.getCurrentAction());
	const dealer = $derived(game.getCurrentDealer());
	const playerNumber = $derived(game.getCurrentPlayer());
	let goingAlone = $state(false);
	let orientation = $state('front');
</script>

{#if action !== Action.PlayCard && action !== Action.Invalid}
	<div class="container h-full">
		<div class="flex h-full items-center justify-center p-1 pb-0 md:p-4">
			<div
				class="card-container relative flex items-center justify-center rounded-lg border-2 border-dashed p-1"
			>
				{#if round.status === RoundStatus.Initializing}
					<Deck {game} />
				{:else if round.cardShowing}
					{#if action === Action.PassOrAccept}
						<Card
							card={round.cardShowing}
							{orientation}
							onclick={() => {
								if (orientation === 'front') {
									orientation = 'back';
								} else {
									orientation = 'front';
								}
							}}
						/>
						<!-- {:else}
						<Card card={round.cardShowing} orientation="back" /> -->
					{/if}
				{/if}
			</div>
		</div>
		<div class="flex flex-col justify-center gap-1 p-2 pb-0 md:gap-1.5 md:p-4 lg:gap-2">
			{#if round.status === RoundStatus.Bidding}
				{#each Object.entries(Suit) as [_, suit]}
					<BiddingButton {round} {suit} {goingAlone} {dealer} />
				{/each}
				<label
					class="mt-1 flex cursor-pointer select-none items-center gap-1 text-xs sm:text-base md:gap-2 md:text-lg lg:text-xl"
					for="going-alone"
					><input
						type="checkbox"
						class="h-3 w-3 cursor-pointer md:h-5 md:w-5"
						id="going-alone"
						bind:checked={goingAlone}
					/><span class="hidden sm:inline">Going </span>Alone?</label
				>
			{/if}
		</div>
		<div class="pass-container p-2 text-center lg:p-4">
			{#if round.status === RoundStatus.Bidding}
				{#if action === Action.StickTheDealer}
					<div class="h-[46px] text-sm md:text-2xl">Dealer must choose a suit</div>
				{:else if action === Action.SwapCard && typeof playerNumber !== 'undefined'}
					<div
						class="flex items-center justify-center p-2 text-center text-sm sm:p-4 md:text-2xl lg:p-8"
					>
						Waiting for {game.players[playerNumber].name ?? `Player ${playerNumber + 1}`} to discard
						a card...
					</div>
				{:else}
					<button
						onclick={() => round.passBid()}
						class="bidding-button bg-blue-200 text-black shadow-lg">Pass</button
					>
				{/if}
			{/if}
		</div>
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
		width: min(calc(60cqw * 9 / 14 - 10px), calc(60cqh * 9 / 14 - 10px));
		@media screen and (min-width: 960px) and (min-height: 960px) {
			width: min(calc(50cqw * 9 / 14 - 10px), calc(50cqh * 9 / 14 - 10px));
		}
	}

	:global {
		button.bidding-button {
			width: 100%;
			border-radius: 6px;
			padding-inline: 4px;
			padding-block: 3px;
			font-size: 12px;
			font-weight: bold;
			&:disabled {
				background-color: rgba(180, 180, 180, 0.7);
				cursor: not-allowed;
			}
			@media screen and (min-width: 640px) and (min-height: 640px) {
				border-radius: 10px;
				padding-inline: 8px;
				padding-block: 4px;
				font-size: 16px;
			}
			@media screen and (min-width: 960px) and (min-height: 960px) {
				padding-inline: 12px;
				padding-block: 5px;
				font-size: 18px;
			}
			@media screen and (min-width: 1280px) and (min-height: 1280px) {
				padding-inline: 16px;
				padding-block: 8px;
				font-size: 20px;
			}
		}
	}
</style>
