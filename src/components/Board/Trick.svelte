<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import type { Player } from '$lib/types/Player';
	import { getPlayerPosition } from '$lib/utilities/getPlayerPosition';
	import Card from '../Card.svelte';

	type Props = {
		game: GameState;
		mainPlayer: Player['id'];
	};

	const { game, mainPlayer }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const trick = $derived(round?.tricks[round.tricks.length - 1]);
	const trickCards = $derived.by(() => {
		return trick.cards.map((card, index) => {
			return {
				position: getPlayerPosition(game.players[index].id, game.players, mainPlayer),
				card
			};
		});
	});
</script>

<div class="trick absolute inset-0">
	{#each trickCards as { card, position }}
		{#if card}
			<div class="trick-card {position} absolute inset-0">
				<div class="card-container absolute left-0 right-0 mx-auto">
					<Card {card} orientation="front" />
				</div>
			</div>
		{/if}
	{/each}
</div>

<style>
	.trick-card {
		&.left {
			rotate: 90deg;
		}
		&.top {
			rotate: 180deg;
		}
		&.right {
			rotate: -90deg;
		}
	}
	.card-container {
		width: min(12dvh, 12vw);
		bottom: max(-4dvh, -4vw);
		@media screen and (min-width: 640px) and (min-height: 640px) {
			width: min(10dvh, 10vw);
			bottom: max(-6dvh, -6vw);
		}
		@media screen and (min-width: 960px) and (min-height: 960px) {
			width: min(8dvh, 8vw);
		}
	}
</style>
