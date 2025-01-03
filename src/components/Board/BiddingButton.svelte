<script lang="ts">
	import type { RoundState } from '$lib/state/RoundState.svelte';
	import { Suit, SuitEmoji, type CardSuit } from '$lib/types/Card';
	import { RoundStatus, type Round } from '$lib/types/Round';

	type Props = {
		round: RoundState;
		suit: CardSuit;
		goingAlone: boolean;
		dealer: number;
	};

	const { round, suit, goingAlone, dealer }: Props = $props();
	let cardShowingSuit: CardSuit = $state(Suit.Hearts);
	$effect(() => {
		if (round.status === RoundStatus.Bidding && round.cardShowing) {
			cardShowingSuit = round.cardShowing.suit;
		}
	});
</script>

<button
	onclick={() => round.acceptBid(goingAlone, dealer, suit)}
	disabled={round.cardShowing ? round.cardShowing.suit !== suit : suit === cardShowingSuit}
	class="bidding-button bg-white"
	style:--button-name={`trump-${suit}`}>{SuitEmoji[suit]}</button
>

<style>
	.bidding-button {
		view-transition-name: var(--button-name);
	}
</style>
