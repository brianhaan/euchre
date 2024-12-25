<script lang="ts">
	import type { Position } from '$lib/utilities/getPlayerPosition';

	type Props = {
		currentPlayer?: number;
		playerIndex: number;
		position: Position;
	};

	const { currentPlayer, playerIndex, position }: Props = $props();
</script>

{#if playerIndex === currentPlayer}
	<div class="absolute -bottom-4 left-0 right-0 sm:-bottom-7 md:-bottom-10 lg:-bottom-12">
		<div class="current-player mx-auto flex items-end justify-end {position}">
			<span class="text-sm sm:text-lg md:text-3xl lg:text-4xl">⬅️</span>
		</div>
	</div>
{/if}

<style>
	@keyframes bounce {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-20px);
		}
		100% {
			transform: translateX(0);
		}
	}

	.current-player {
		animation: bounce 2s infinite ease-in-out;
		width: min(50vh, 50vw);
		&.bottom {
			width: min(85vh, 85vw);
			@media screen and (min-width: 640px) and (min-height: 640px) {
				width: min(70vh, 70vw);
			}
			@media screen and (min-width: 960px) and (min-height: 960px) {
				width: min(73vh, 73vw);
			}
		}
	}
</style>
