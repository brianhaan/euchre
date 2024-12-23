<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import type { CardInHand, Hand } from '$lib/types/Hand';
	import { getCardInHandScore } from '$lib/utilities/getCardInHandScore';
	import Card from '../Card.svelte';

	type Props = {
		game: GameState;
		playerIndex: number;
		position: 'bottom' | 'left' | 'top' | 'right';
	};

	const { game, playerIndex, position }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const action = $derived(game.getCurrentAction());
	const hand = $derived((round?.hands?.[playerIndex] ?? []) as Hand);
	const cards = $derived.by(() => {
		return [...hand]
			.sort((a, b) => {
				return getCardInHandScore(b.card) - getCardInHandScore(a.card);
			})
			.filter((cardInHand) => !cardInHand.isPlayed);
	});

	const r = 'min(75vw, 75vh)';
	const theta = 14;
	// const r = position === 'bottom' ? '60vw' : '40vw';
	// const theta = position === 'bottom' ? 15 : 10;
	const n = $derived.by(() => {
		return hand
			.map((cardInHand: CardInHand) => (cardInHand.isPlayed ? 0 : 1))
			.reduce((acc: number, value) => acc + value, 0);
	});
</script>

<div
	class="hand-container mx-auto h-full w-full {position} relative"
	style="translate: -{(n - 1) * 30}%"
>
	<div class="hand-rotator h-full w-full" style="rotate: -{(theta * (n - 1)) / 2}deg;">
		{#each cards as cardInHand, i}
			{#if !cardInHand.isPlayed}
				<div
					class="card-rotator absolute left-0 right-0 top-0 flex-grow"
					style="rotate: {theta * i}deg; height: {r};"
				>
					<div class="card-container">
						<Card
							card={cardInHand.card}
							orientation="front"
							variant={round.canCardBePlayed(playerIndex, cardInHand.card) ? 'default' : 'disabled'}
							onclick={() => {
								if (action === Action.SwapCard) {
									round.swapCard(playerIndex, cardInHand.card);
								} else if (action === Action.PlayCard) {
									round.playCard(playerIndex, cardInHand.card);
								}
							}}
						/>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.card-container {
		&:hover {
			scale: 1.1;
			z-index: 200;
			transition: all 0.1s;
		}
	}
</style>
