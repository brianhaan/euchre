<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import type { CardInHand, Hand } from '$lib/types/Hand';
	import type { Player } from '$lib/types/Player';
	import { RoundStatus } from '$lib/types/Round';
	import BidPanel from './BidPanel.svelte';
	import PlayerHand from './PlayerHand.svelte';
	import PlayerInfo from './PlayerInfo.svelte';

	type Props = {
		player: Player;
		mainPlayer: Player['id'];
		game: GameState;
	};
	type Position = 'bottom' | 'left' | 'top' | 'right';

	const { player, mainPlayer, game }: Props = $props();
	const round = $derived(game.rounds[game.rounds.length - 1]);
	const playerIndex = $derived(game.players.findIndex((p) => p.id === player.id));
	const currentPlayer = $derived(game.getCurrentPlayer());
	const dealer = $derived(game.getCurrentDealer());
	const position: Position = $derived.by(() => {
		const mainPlayerIndex = game.players.findIndex((p) => p.id === mainPlayer);
		const playerByMain = [
			...game.players.slice(mainPlayerIndex),
			...game.players.slice(0, mainPlayerIndex)
		];
		const index = playerByMain.findIndex((p) => p.id === player.id);
		return index === 0 ? 'bottom' : index === 1 ? 'left' : index === 2 ? 'top' : 'right';
	});
	const hand = $derived((round?.hands?.[playerIndex] ?? []) as Hand);
	const numCards = $derived.by(() => {
		return hand
			.map((cardInHand: CardInHand) => (cardInHand.isPlayed ? 0 : 1))
			.reduce((acc: number, value) => acc + value, 0);
	});
</script>

<div class="player-panel {position} absolute">
	<!-- <div class="info-container absolute inset-0">
		<PlayerInfo {player} {playerIndex} {dealer} {currentPlayer} />
	</div> -->
	<div class="hand-container mx-auto h-full border border-red-600" style="width: {numCards * 20}%">
		<PlayerHand {game} {position} {playerIndex} />
	</div>
</div>

<style>
	.player-panel {
		&.bottom,
		&.top {
			left: 0;
			right: 0;
			height: min(20vh, 20vw);
			width: min(50vh, 50vw);
			margin-inline: auto;
		}
		&.bottom {
			bottom: 0;
			.hand-container {
				scale: 125%;
				transform: translateY(-20px);
			}
		}
		&.top {
			top: 0;
			.hand-container {
				rotate: 180deg;
			}
		}
		&.left {
			left: 0;
			.hand-container {
				rotate: 90deg;
				translate: max(-15vh, -15vw);
				transform-origin: center;
			}
		}
		&.right {
			right: 0;
			.hand-container {
				rotate: -90deg;
				translate: min(15vh, 15vw);
				transform-origin: center;
			}
		}
		&.left,
		&.right {
			top: 0;
			bottom: 0;
			width: min(50vh, 50vw);
			height: min(20vh, 20vw);
			margin-block: auto;
		}
	}
</style>
