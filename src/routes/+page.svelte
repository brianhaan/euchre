<script lang="ts">
	import { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import { Suit, SuitEmoji, Value } from '$lib/types/Card';
	import { RoundStatus } from '$lib/types/Round';
	import { getCurrentAction } from '$lib/utilities/getCurrentAction';
	import { getCurrentDealer } from '$lib/utilities/getCurrentDealer';
	import Card from '../components/Card.svelte';

	const game = new GameState();
	let dealer = $derived(getCurrentDealer(game));
	let round = $derived(game.rounds[game.rounds.length - 1]);
	let { action, player: playerNumber } = $derived.by(() => getCurrentAction(game));
</script>

<div class="wrapper mb-6">
	<div class="flex h-32 justify-between">
		<div>
			<p>Round: {game.rounds.length}</p>
		</div>
		{#if round.cardShowing}
			<div>
				Card on top:
				<div><Card card={round.cardShowing} /></div>
			</div>
		{/if}
		{#if round.trump}
			<div>
				Trump:
				<div><Card card={{ suit: round.trump, value: Value.Jack }} /></div>
			</div>
		{/if}
	</div>
</div>

<div class="flex flex-col gap-4 lg:flex-row">
	{#each game.players as player, playerIndex}
		<div class="wrapper flex-1">
			<div class="flex min-h-16 justify-between gap-4">
				<p>
					Player {playerIndex + 1}:
					<strong>{player?.name ?? `Player ${playerIndex + 1}`}</strong>
					{#if playerNumber === playerIndex}
						<span>👈</span>
					{/if}
				</p>
				{#if dealer === playerIndex}
					<p class="dealer h-fit">Dealer</p>
				{/if}
			</div>
			<div class="flex gap-1">
				{#each round?.hands?.[playerIndex] ?? [] as cardInHand}
					<Card
						card={cardInHand.card}
						onclick={() => {
							if (action === Action.SwapCard && playerIndex === playerNumber) {
								round.swapCard(playerIndex, cardInHand.card);
							}
						}}
					/>
				{/each}
			</div>
			{#if playerNumber === playerIndex && round.status !== RoundStatus.Tricks}
				<div class="wrapper mt-4 p-2">
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
							<button onclick={() => round.acceptBid(false, Suit.Hearts)}
								>{SuitEmoji[Suit.Hearts]}</button
							>
							<button onclick={() => round.acceptBid(false, Suit.Spades)}
								>{SuitEmoji[Suit.Spades]}</button
							>
							<button onclick={() => round.acceptBid(false, Suit.Diamonds)}
								>{SuitEmoji[Suit.Diamonds]}</button
							>
							<button onclick={() => round.acceptBid(false, Suit.Clubs)}
								>{SuitEmoji[Suit.Clubs]}</button
							>
						</div>
						<div>
							Going Alone
							<button onclick={() => round.acceptBid(true, Suit.Hearts)}
								>{SuitEmoji[Suit.Hearts]}</button
							>
							<button onclick={() => round.acceptBid(true, Suit.Spades)}
								>{SuitEmoji[Suit.Spades]}</button
							>
							<button onclick={() => round.acceptBid(true, Suit.Diamonds)}
								>{SuitEmoji[Suit.Diamonds]}</button
							>
							<button onclick={() => round.acceptBid(true, Suit.Clubs)}
								>{SuitEmoji[Suit.Clubs]}</button
							>
						</div>
					{:else if action === Action.StickTheDealer}
						<div>
							Accept
							<button onclick={() => round.acceptBid(false, Suit.Hearts)}
								>{SuitEmoji[Suit.Hearts]}</button
							>
							<button onclick={() => round.acceptBid(false, Suit.Spades)}
								>{SuitEmoji[Suit.Spades]}</button
							>
							<button onclick={() => round.acceptBid(false, Suit.Diamonds)}
								>{SuitEmoji[Suit.Diamonds]}</button
							>
							<button onclick={() => round.acceptBid(false, Suit.Clubs)}
								>{SuitEmoji[Suit.Clubs]}</button
							>
						</div>
						<div>
							Going Alone
							<button onclick={() => round.acceptBid(true, Suit.Hearts)}
								>{SuitEmoji[Suit.Hearts]}</button
							>
							<button onclick={() => round.acceptBid(true, Suit.Spades)}
								>{SuitEmoji[Suit.Spades]}</button
							>
							<button onclick={() => round.acceptBid(true, Suit.Diamonds)}
								>{SuitEmoji[Suit.Diamonds]}</button
							>
							<button onclick={() => round.acceptBid(true, Suit.Clubs)}
								>{SuitEmoji[Suit.Clubs]}</button
							>
						</div>
					{:else if action === Action.SwapCard}
						Choose a card to swap out
					{/if}
				</div>
			{/if}
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
	button {
		padding: 3px 10px;
		background-color: lightblue;
	}
</style>
