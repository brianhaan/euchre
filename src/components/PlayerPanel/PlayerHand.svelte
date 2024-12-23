<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import type { CardInHand, Hand } from '$lib/types/Hand';
	import { getCardInHandScore } from '$lib/utilities/getCardInHandScore';
	import Card from '../Card.svelte';

	type Props = {
		game: GameState;
		playerIndex: number;
		dealer: number;
		position: 'bottom' | 'left' | 'top' | 'right';
	};

	const { game, playerIndex, position, dealer }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const action = $derived(game.getCurrentAction());

	const hand = $derived((round?.hands?.[playerIndex] ?? []) as Hand);
	const cards = $derived.by(() => {
		const cardsInHand = [...hand]
			.sort((a, b) => {
				return getCardInHandScore(b.card) - getCardInHandScore(a.card);
			})
			.filter((cardInHand) => !cardInHand.isPlayed);
		if (action === Action.SwapCard && dealer === playerIndex && round.cardShowing) {
			cardsInHand.push({ isPlayed: false, card: round.cardShowing });
		}
		return cardsInHand;
	});

	const r = 'min(75vw, 75vh)';
	const theta = 14;
	const n = $derived(cards.length);
</script>

<div
	class="hand-container mx-auto w-full {position} relative z-20"
	style="translate: -{(n - 1) * 45}%"
>
	<div class="hand-rotator w-full" style="rotate: -{(theta * (n - 1)) / 2}deg;">
		{#each cards as cardInHand, i}
			{#if !cardInHand.isPlayed}
				<div class="card-rotator absolute z-30 w-full" style="rotate: {theta * i}deg; height: {r};">
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
	.card-rotator:hover {
		scale: 1.07;
		z-index: 200;
		transition: all 0.1s;
	}
</style>
