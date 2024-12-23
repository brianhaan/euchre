<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';
	import type { CardInHand, Hand } from '$lib/types/Hand';
	import type { Player } from '$lib/types/Player';
	import { RoundStatus } from '$lib/types/Round';
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
</script>

<div class="player-panel {position} z-1 absolute">
	<!-- <div class="info-wrapper absolute inset-0">
		<PlayerInfo {player} {playerIndex} {dealer} {currentPlayer} />
	</div> -->
	<div class="hand-wrapper h-full w-full">
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
			width: min(10vh, 10vw);
			margin-inline: auto;
		}
		&.bottom {
			bottom: 0;
			transform: translateY(min(2vh, 2vw));
			.hand-wrapper {
				scale: 140%;
			}
		}
		&.top {
			top: 0;
			transform: translateY(max(-4vh, -4vw));
			.hand-wrapper {
				rotate: 180deg;
			}
		}
		&.left {
			left: 0;
			.hand-wrapper {
				rotate: 90deg;
			}
		}
		&.right {
			right: 0;
			.hand-wrapper {
				rotate: -90deg;
			}
		}
		&.left,
		&.right {
			top: 0;
			bottom: 0;
			width: min(10vh, 10vw);
			height: min(20vh, 20vw);
			margin-block: auto;
		}
	}
</style>
