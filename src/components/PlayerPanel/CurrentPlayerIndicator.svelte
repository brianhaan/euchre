<script lang="ts">
	type Props = {
		currentPlayer?: number;
		playerIndex: number;
	};

	const { currentPlayer, playerIndex }: Props = $props();
</script>

{#if currentPlayer === playerIndex}
	<div class="current-player absolute left-0 right-0">
		<div class="text-center text-5xl" aria-label="Dealer" title="Dealer">⬇️</div>
	</div>
{/if}

<style>
	.current-player {
		top: max(-7vh, -7vw);
	}
</style>
