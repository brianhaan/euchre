<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import { Action } from '$lib/types/Action';
	import type { Player } from '$lib/types/Player';
	import Card from '../Card.svelte';

	type Props = {
		player: Player;
		mainPlayer: Player['id'];
		game: GameState;
	};
	type Position = 'bottom' | 'left' | 'top' | 'right';

	const { player, mainPlayer, game }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const playerIndex = $derived(game.players.findIndex((p) => p.id === player.id));
	const position: Position = $derived.by(() => {
		const mainPlayerIndex = game.players.findIndex((p) => p.id === mainPlayer);
		const playerByMain = [
			...game.players.slice(mainPlayerIndex),
			...game.players.slice(0, mainPlayerIndex)
		];
		const index = playerByMain.findIndex((p) => p.id === player.id);
		return index === 0 ? 'bottom' : index === 1 ? 'left' : index === 2 ? 'top' : 'right';
	});
</script>

<div class="player-panel {position} absolute p-4">
	<strong>{player.name ?? `Player ${playerIndex + 1}`}</strong>
	<div class="flex gap-1">
		{#each round?.hands?.[playerIndex] ?? [] as cardInHand}
			{#if !cardInHand.isPlayed}
				<Card
					card={cardInHand.card}
					orientation="front"
					variant={round.canCardBePlayed(playerIndex, cardInHand.card) ? 'default' : 'disabled'}
					onclick={() => {
						// if (playerIndex === playerNumber) {
						// if (action === Action.SwapCard) {
						// 	round.swapCard(playerIndex, cardInHand.card);
						// } else if (action === Action.PlayCard) {
						// 	round.playCard(playerIndex, cardInHand.card);
						// }
						// }
					}}
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	.player-panel {
		font-size: 24px;
		&.bottom {
			left: 0;
			right: 0;
			bottom: 0;
			width: 60%;
			margin-inline: auto;
			border-bottom: 0;
		}
		&.left {
			left: 0;
			top: 0;
			bottom: 0;
			height: min(50vh, 50vw);
			margin-block: auto;
			border-left: 0;
		}
		&.top {
			top: 0;
			left: 0;
			right: 0;
			width: min(50vh, 50vw);
			margin-inline: auto;
			border-top: 0;
		}
		&.right {
			right: 0;
			top: 0;
			bottom: 0;
			height: min(50vh, 50vw);
			margin-block: auto;
			border-right: 0;
		}
	}
</style>
