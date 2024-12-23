<script lang="ts">
	import type { Player } from '$lib/types/Player';

	type Props = {
		player: Player;
		playerIndex: number;
		isMainPlayer: boolean;
	};

	const { player, playerIndex, isMainPlayer } = $props();
</script>

<div class="absolute -bottom-10 left-0 right-0 z-0 text-center">
	<div
		class="inline-block {isMainPlayer ? '' : 'rotate-180'} rounded-lg border bg-green-900 px-6 py-2"
	>
		<strong class="player-name text-2xl">{player.name ?? `Player ${playerIndex + 1}`}</strong>
	</div>
</div>

<style>
	.rotate {
	}
</style>
