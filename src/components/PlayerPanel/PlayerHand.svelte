<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import type { Card as CardType } from '$lib/types/Card';
	import { areCardsEqual } from '$lib/utilities/areCardsEqual';
	import { getCardInHandScore } from '$lib/utilities/getCardInHandScore';
	import type { Position } from '$lib/utilities/getPlayerPosition';
	import { getViewport, type Viewport } from '$lib/utilities/getViewport';
	import { isCardInSuit } from '$lib/utilities/isCardInSuit';
	import Card from '../Card.svelte';

	type Props = {
		game: GameState;
		playerIndex: number;
		currentPlayer?: number;
		dealer: number;
		position: Position;
	};

	const { game, playerIndex, currentPlayer, position, dealer }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const action = $derived(game.getCurrentAction());
	const hand = $derived(round?.hands?.[playerIndex] ?? []);
	const cards = $derived.by(() => {
		const cardsInHand = [...hand].filter((cardInHand) => !cardInHand.isPlayed);
		return round.trump
			? cardsInHand.sort((a, b) => {
					return getCardInHandScore(b.card, round.trump) - getCardInHandScore(a.card, round.trump);
				})
			: cardsInHand;
	});
	const canUseACard = $derived(
		currentPlayer === playerIndex && (action === Action.SwapCard || action === Action.PlayCard)
	);
	let cardQueued: CardType | undefined = $state();

	let viewport: Viewport = $state('base');
	$effect(() => {
		function setViewport() {
			viewport = getViewport();
		}
		viewport = getViewport();
		window.addEventListener('resize', setViewport);
		return () => window.removeEventListener('resize', setViewport);
	});

	let n = $derived(cards.length);
	let { r, theta, tx } = $derived.by(() => {
		if (viewport === 'base') {
			return { r: 'min(100dvh, 100vw)', theta: 12, tx: 21 };
		} else if (viewport === 'sm') {
			return { r: 'min(85dvh, 85vw)', theta: 13, tx: 32 };
		}
		return { r: 'min(75dvh, 75vw)', theta: 14, tx: 40 };
	});
</script>

<div
	class:playable={canUseACard}
	class="hand-container relative z-20 mx-auto w-full {position}"
	style:--hand-translate={`${-(n - 1) * tx}%`}
>
	<div class="hand-rotator w-full" style:--hand-rotate={`${(-theta * (n - 1)) / 2}deg`}>
		{#each cards as cardInHand, i}
			{#if !cardInHand.isPlayed}
				<div
					class:card-queued={areCardsEqual(cardQueued, cardInHand.card)}
					class="card-rotator absolute z-30 w-full"
					style:--card-rotate={`${theta * i}deg`}
					style:--card-height={r}
				>
					<div class="card-container">
						<Card
							card={cardInHand.card}
							orientation="front"
							disabled={!round.canCardBePlayed(playerIndex, cardInHand.card)}
							trump={isCardInSuit(cardInHand.card, round.trump, round.trump)}
							onclick={canUseACard
								? () => {
										if (!cardQueued && viewport === 'base') {
											cardQueued = cardInHand.card;
										} else if (cardQueued && !areCardsEqual(cardInHand.card, cardQueued)) {
											cardQueued = cardInHand.card;
										} else {
											cardQueued = undefined;
											if (action === Action.SwapCard) {
												round.swapCard(playerIndex, cardInHand.card);
											} else if (action === Action.PlayCard) {
												round.playCard(playerIndex, cardInHand.card);
											}
										}
									}
								: undefined}
						/>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.card-rotator {
		rotate: var(--card-rotate);
		height: var(--card-height);
	}
	.hand-rotator {
		rotate: var(--hand-rotate);
	}
	.hand-container {
		transform: translateX(var(--hand-translate));
	}
	.hand-container.bottom.playable {
		.card-rotator:hover,
		.card-rotator.card-queued {
			scale: 1.07;
			z-index: 200;
			transition: all 0.1s;
		}
	}
</style>
