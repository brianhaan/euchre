<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import { getCardInHandScore } from '$lib/utilities/getCardInHandScore';
	import type { Position } from '$lib/utilities/getPlayerPosition';
	import { getViewport, type Viewport } from '$lib/utilities/getViewport';
	import { isCardInSuit } from '$lib/utilities/isCardInSuit';
	import { isLeftBower } from '$lib/utilities/isLeftBower';
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
		if (action === Action.SwapCard && dealer === playerIndex && round.cardShowing) {
			cardsInHand.push({ isPlayed: false, card: round.cardShowing });
		}
		return cardsInHand.sort((a, b) => {
			return getCardInHandScore(b.card, round?.trump) - getCardInHandScore(a.card, round?.trump);
		});
	});
	const canUseACard = $derived(
		currentPlayer === playerIndex && (action === Action.SwapCard || action === Action.PlayCard)
	);

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
			return { r: 'min(100vh, 100vw)', theta: 12, tx: 21 };
		} else if (viewport === 'sm') {
			return { r: 'min(85vh, 85vw)', theta: 13, tx: 32 };
		}
		return { r: 'min(75vh, 75vw)', theta: 14, tx: 40 };
	});
	$inspect(canUseACard);
</script>

<div
	class="hand-container mx-auto w-full {position} {canUseACard ? 'playable' : ''} relative z-20"
	style="translate: -{(n - 1) * tx}%"
>
	<div class="hand-rotator w-full" style="rotate: -{(theta * (n - 1)) / 2}deg;">
		{#each cards as cardInHand, i}
			{#if !cardInHand.isPlayed}
				<div class="card-rotator absolute z-30 w-full" style="rotate: {theta * i}deg; height: {r};">
					<div class="card-container">
						<Card
							card={cardInHand.card}
							orientation="front"
							isDisabled={!round.canCardBePlayed(playerIndex, cardInHand.card)}
							isTrump={isCardInSuit(cardInHand.card, round.trump, round.trump)}
							onclick={canUseACard
								? () => {
										if (action === Action.SwapCard) {
											round.swapCard(playerIndex, cardInHand.card);
										} else if (action === Action.PlayCard) {
											round.playCard(playerIndex, cardInHand.card);
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
	.hand-container.bottom.playable {
		.card-rotator:hover {
			scale: 1.07;
			z-index: 200;
			transition: all 0.1s;
		}
	}
</style>
