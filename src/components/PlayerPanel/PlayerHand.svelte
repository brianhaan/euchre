<script lang="ts">
	import type { RoundState } from '$lib/state/RoundState.svelte';
	import type { CardInHand, Hand } from '$lib/types/Hand';
	import { getCardInHandScore } from '$lib/utilities/getCardInHandScore';
	import Card from '../Card.svelte';

	type Props = {
		round: RoundState;
		playerIndex: number;
		position: 'bottom' | 'left' | 'top' | 'right';
	};

	const { round, playerIndex, position }: Props = $props();
	const hand = $derived((round?.hands?.[playerIndex] ?? []) as Hand);
	const handOrdered = $derived.by(() => {
		return [...hand].sort((a, b) => {
			return getCardInHandScore(b.card) - getCardInHandScore(a.card);
		});
	});
	const numCards = $derived.by(() => {
		return hand
			.map((cardInHand: CardInHand) => (cardInHand.isPlayed ? 0 : 1))
			.reduce((acc: number, value) => acc + value, 0);
	});
</script>

<div class="container flex w-full gap-2 {position}">
	{#each handOrdered as cardInHand, cardIndex}
		{#if !cardInHand.isPlayed}
			<div
				class="card-container flex-grow"
				style="transform: rotate({(cardIndex + 0.5 - numCards / 2) * 8}deg) translateY({Math.pow(
					Math.abs(cardIndex + 0.5 - numCards / 2) * 3,
					2.12
				)}px) translateX({(numCards / 2 - cardIndex - 0.5) * 20}px);"
			>
				<Card
					card={cardInHand.card}
					orientation="front"
					variant={round.canCardBePlayed(playerIndex, cardInHand.card) ? 'default' : 'disabled'}
					onclick={() => {
						// if (playerIndex === playerNumber) {
						// if (action === Action.SwapCard) {
						// 	round.swapCard(playerIndex, cardInHand.card);
						// } else if (action === Action.PlayCard) {
						// 	round.playCard(playerIndex, cardInHand.card);
						// }
						// }
					}}
				/>
			</div>
		{/if}
	{/each}
</div>

<style>
	.container {
		&.left {
			transform-origin: top left;
			transform: translateY(-120%);
			rotate: 90deg;
		}
		&.right {
			transform-origin: top right;
			transform: translateY(-120%);
			rotate: -90deg;
		}
		&.top {
			transform-origin: top center;
			transform: translateY(-120%);
			rotate: 180deg;
		}
	}
	.card-container {
		transform-origin: bottom center;
		&:hover {
			scale: 1.1;
			z-index: 200;
			transition: all 0.1s;
		}
	}
</style>
