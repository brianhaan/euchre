<script lang="ts">
	import { fly } from 'svelte/transition';
	import Card from '../Card.svelte';
	import { cubicOut } from 'svelte/easing';
	import type { GameState } from '$lib/state/GameState.svelte';

	type Props = {
		game: GameState;
	};

	const { game }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
</script>

{#each round.deck ?? [] as cardInDeck}
	{#if cardInDeck.isShuffled}
		<div
			class="absolute inset-1"
			in:fly={{
				x: -250,
				y: -250,
				duration: 500,
				easing: cubicOut
			}}
		>
			<Card card={cardInDeck.card} orientation="back" />
		</div>
	{/if}
{/each}
