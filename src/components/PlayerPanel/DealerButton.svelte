<script lang="ts">
	type Props = {
		dealer: number;
		playerIndex: number;
	};

	const { dealer, playerIndex }: Props = $props();
</script>

{#if dealer == playerIndex}
	<div class="dealer-button absolute bottom-10 left-0 right-0">
		<div class="relative" aria-label="Dealer" title="Dealer">
			<div class="absolute inset-0 flex items-center justify-center text-5xl">🔵</div>
			<div class="absolute inset-0 flex items-center justify-center text-3xl">🟡</div>
		</div>
	</div>
{/if}

<style>
	.dealer-button {
		padding-right: min(45vh, 45vw);
	}
</style>
