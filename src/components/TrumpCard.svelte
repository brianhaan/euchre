<script lang="ts">
	import { SuitEmoji } from '$lib/types/Card';
	import type { Round } from '$lib/types/Round';

	const { suit }: { suit: Round['trump'] } = $props();
</script>

{#if suit}
	<div class="absolute right-0 top-0 m-2 flex flex-col md:m-4">
		<div
			class="trump flex w-12 flex-col items-center justify-center rounded-lg border-2 border-black text-2xl shadow-xl sm:w-16 sm:text-3xl md:w-24 md:text-5xl"
		>
			{SuitEmoji[suit]}
		</div>
	</div>
{/if}

<style>
	.trump {
		aspect-ratio: 9 / 14;
		background-color: var(--bg-card);
	}
</style>
