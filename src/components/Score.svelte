<script lang="ts">
	import type { GameState } from '$lib/state/GameState.svelte';

	const { game }: { game: GameState } = $props();
	const score = $derived(game.getScore());
</script>

<div class="scoreboard absolute left-4 top-4 p-4 text-xl">
	<table>
		<tbody>
			<tr>
				<th>{game.players[0].name ?? 'Player 1'} and {game.players[2].name ?? 'Player 3'}</th><td
					>{score[0]}</td
				>
			</tr>
			<tr
				><th>{game.players[1].name ?? 'Player 2'} and {game.players[3].name ?? 'Player 4'}</th><td
					>{score[1]}</td
				></tr
			></tbody
		>
	</table>
</div>

<style>
	.scoreboard {
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 10px;
	}

	td {
		padding-inline-start: 28px;
		text-align: right;
	}
</style>
