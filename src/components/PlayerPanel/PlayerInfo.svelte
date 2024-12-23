<script lang="ts">
	import type { Player } from '$lib/types/Player';

	type Props = {
		player: Player;
		playerIndex: number;
		currentPlayer: number;
		dealer: number;
	};

	const { player, playerIndex, currentPlayer, dealer } = $props();
</script>

<div class="absolute inset-0 flex items-center justify-center border border-red-500">
	<strong>{player.name ?? `Player ${playerIndex + 1}`}</strong>
</div>

<!-- <div class="relative flex gap-4">
	{#if currentPlayer === playerIndex}
		<div class="absolute -left-8">➡️</div>
	{/if}
	
	{#if dealer === playerIndex}
		<span aria-label="Dealer" title="Dealer">🔵</span>
	{/if}
</div> -->
