<script lang="ts">
	import type { Player } from '$lib/types/Player';

	type Props = {
		player: Player;
		playerIndex: number;
		position: string;
	};

	const { player, playerIndex, position }: Props = $props();
</script>

<div class="absolute -bottom-10 left-0 right-0 z-0 text-center">
	<div
		class="inline-block {position === 'bottom'
			? ''
			: 'rotate-180'} rounded-lg border bg-green-900 px-6 py-2"
	>
		<strong class="player-name text-2xl">{player.name ?? `Player ${playerIndex + 1}`}</strong>
	</div>
</div>

<style>
	.rotate {
	}
</style>
