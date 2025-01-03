<script lang="ts">
	import { SuitEmoji } from '$lib/types/Card';
	import type { Round } from '$lib/types/Round';

	const { suit }: { suit: Round['trump'] } = $props();
</script>

{#if suit}
	<div class="absolute right-0 top-0 m-2 flex flex-col md:m-4">
		<div
			class="trump flex w-12 flex-col items-center justify-center rounded-lg border-2 border-black text-xl shadow-xl sm:text-2xl md:w-16 md:text-3xl lg:w-20 lg:text-4xl"
			style:--card-name={`trump-${suit}`}
		>
			{SuitEmoji[suit]}
		</div>
	</div>
{/if}

<style>
	.trump {
		view-transition-name: var(--card-name);
		aspect-ratio: 9 / 14;
		background-color: var(--bg-card);
	}
</style>
