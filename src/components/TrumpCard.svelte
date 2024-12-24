<script lang="ts">
	import { SuitEmoji } from '$lib/types/Card';
	import type { Round } from '$lib/types/Round';

	const { suit }: { suit: Round['trump'] } = $props();
</script>

{#if suit}
	<div class="absolute right-0 top-0 flex flex-col gap-2 p-4">
		<div
			class="trump flex w-24 flex-col items-center justify-center rounded-lg border-2 border-black text-5xl shadow-xl"
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
