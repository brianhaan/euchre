<script lang="ts">
	import type { Player } from '$lib/types/Player';

	type Props = {
		player: Player;
		playerIndex: number;
		currentPlayer: number;
		dealer: number;
	};

	const { player, playerIndex, currentPlayer, dealer } = $props();
	$inspect(currentPlayer);
</script>

<div class="relative flex gap-4">
	{#if currentPlayer === playerIndex}
		<div class="absolute -left-8">➡️</div>
	{/if}
	<strong>{player.name ?? `Player ${playerIndex + 1}`}</strong>
	{#if dealer === playerIndex}
		<span aria-label="Dealer" title="Dealer">🔵</span>
	{/if}
</div>
