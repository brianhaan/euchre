<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import { Suit, SuitEmoji } from '$lib/types/Card';

	type Props = {
		game: GameState;
		playerIndex: number;
	};

	const { game, playerIndex }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const action = $derived(game.getCurrentAction());
</script>

<div class="bid-panel rounded-xl p-4">
	{#if action === Action.PassOrAccept}
		<button onclick={() => round.passBid()}>Pass</button>
		<button onclick={() => round.acceptBid(false)}>Accept</button>
		<button onclick={() => round.acceptBid(true)}>Going Alone</button>
	{:else if action === Action.PassOrAcceptWithTrump}
		<div>
			<button onclick={() => round.passBid()}>Pass</button>
		</div>
		<div>
			Accept
			<button onclick={() => round.acceptBid(false, Suit.Hearts)}>{SuitEmoji[Suit.Hearts]}</button>
			<button onclick={() => round.acceptBid(false, Suit.Spades)}>{SuitEmoji[Suit.Spades]}</button>
			<button onclick={() => round.acceptBid(false, Suit.Diamonds)}
				>{SuitEmoji[Suit.Diamonds]}</button
			>
			<button onclick={() => round.acceptBid(false, Suit.Clubs)}>{SuitEmoji[Suit.Clubs]}</button>
		</div>
		<div>
			Going Alone
			<button onclick={() => round.acceptBid(true, Suit.Hearts)}>{SuitEmoji[Suit.Hearts]}</button>
			<button onclick={() => round.acceptBid(true, Suit.Spades)}>{SuitEmoji[Suit.Spades]}</button>
			<button onclick={() => round.acceptBid(true, Suit.Diamonds)}
				>{SuitEmoji[Suit.Diamonds]}</button
			>
			<button onclick={() => round.acceptBid(true, Suit.Clubs)}>{SuitEmoji[Suit.Clubs]}</button>
		</div>
	{:else if action === Action.StickTheDealer}
		<div>
			Accept
			<button onclick={() => round.acceptBid(false, Suit.Hearts)}>{SuitEmoji[Suit.Hearts]}</button>
			<button onclick={() => round.acceptBid(false, Suit.Spades)}>{SuitEmoji[Suit.Spades]}</button>
			<button onclick={() => round.acceptBid(false, Suit.Diamonds)}
				>{SuitEmoji[Suit.Diamonds]}</button
			>
			<button onclick={() => round.acceptBid(false, Suit.Clubs)}>{SuitEmoji[Suit.Clubs]}</button>
		</div>
		<div>
			Going Alone
			<button onclick={() => round.acceptBid(true, Suit.Hearts)}>{SuitEmoji[Suit.Hearts]}</button>
			<button onclick={() => round.acceptBid(true, Suit.Spades)}>{SuitEmoji[Suit.Spades]}</button>
			<button onclick={() => round.acceptBid(true, Suit.Diamonds)}
				>{SuitEmoji[Suit.Diamonds]}</button
			>
			<button onclick={() => round.acceptBid(true, Suit.Clubs)}>{SuitEmoji[Suit.Clubs]}</button>
		</div>
	{:else if action === Action.SwapCard}
		Choose a card to swap out
	{/if}
</div>

<style>
	.bid-panel {
		border: 2px solid black;
		background-color: navy;
	}
</style>
