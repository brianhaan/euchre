<script lang="ts">
	import type { RoundState } from '$lib/state/RoundState.svelte';
	import Card from '../Card.svelte';

	const { round }: { round: RoundState } = $props();
</script>

<div class="flex flex-col items-center gap-2">
	<h2 class="text-2xl">Bidding</h2>
	{#if round.cardShowing}
		<div>
			<Card card={round.cardShowing} />
		</div>
	{/if}
</div>
