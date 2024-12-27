<script lang="ts">
	import type { Player } from '$lib/types/Player';
	import type { Position } from '$lib/utilities/getPlayerPosition';
	import Indicator from '../Indicator.svelte';

	type Props = {
		player: Player;
		playerIndex: number;
		dealer: number;
		maker?: number;
		position: Position;
	};

	const { player, playerIndex, dealer, maker, position }: Props = $props();
</script>

<div
	class="absolute -bottom-4 left-0 right-0 top-0 flex justify-end sm:-bottom-6 md:-bottom-8 lg:-bottom-10"
>
	<div class="player-info mx-auto flex justify-start {position}">
		<div
			class="flex w-16 flex-col-reverse items-end justify-start sm:w-24 sm:gap-1 md:w-32 md:gap-4 lg:w-40 lg:gap-6"
		>
			<div class="player-name relative">
				<div
					class="max-w-16 truncate text-[10px] sm:max-w-24 sm:text-sm md:max-w-32 md:text-lg lg:max-w-40 lg:text-2xl"
				>
					{player.name ?? `Player ${playerIndex + 1}`}
				</div>
			</div>
			{#if dealer === playerIndex || maker === playerIndex}
				<div class="buttons flex flex-row items-center text-5xl">
					{#if maker === playerIndex}
						<div class={dealer === playerIndex ? '-mr-5 sm:-mr-2 md:mr-2 lg:mr-4' : ''}>
							<Indicator variant="maker" />
						</div>
					{/if}
					{#if dealer === playerIndex}
						<Indicator variant="dealer" />
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.player-info {
		width: min(65vh, 65vw);
		&.bottom {
			width: min(100vh, 100vw);
		}
		@media screen and (min-width: 640px) and (min-height: 640px) {
			&.bottom {
				width: min(85vh, 85vw);
			}
		}
		@media screen and (min-width: 960px) and (min-height: 960px) {
			width: min(60vh, 60vw);
			&.bottom {
				width: min(80vh, 80vw);
			}
		}
	}

	.top .player-name {
		rotate: 180deg;
	}
</style>
