<script lang="ts">
	import { type Card, SuitEmoji, SuitName, ValueName, ValueSymbol } from '$lib/types/Card';

	type Props = {
		card: Card;
		disabled?: boolean;
		trump?: boolean;
		orientation?: 'front' | 'back';
		onclick?: () => void;
	};

	const { card, disabled = false, trump = false, orientation = 'front', onclick }: Props = $props();
	const valueName = $derived(ValueName[card.value]);
	const suitName = $derived(SuitName[card.suit]);
	const label = $derived(`${valueName} of ${suitName}`);
</script>

<button
	class:disabled
	class:trump
	class:no-click={typeof onclick === undefined}
	class="card suit-{suitName.toLowerCase()} value-{valueName.toLowerCase()}"
	aria-label={label}
	{onclick}
	style:--card-name={`card-${card.suit}-${card.value}`}
>
	<div class="wrapper">
		{#if orientation === 'front'}
			<div class="corner top">
				<div class="value">{ValueSymbol[card.value]}</div>
				<div class="suit">{SuitEmoji[card.suit]}</div>
			</div>
			<div class="corner bottom">
				<div class="value">{ValueSymbol[card.value]}</div>
				<div class="suit">{SuitEmoji[card.suit]}</div>
			</div>
		{/if}
	</div>
</button>

<style>
	div {
		line-height: 1;
	}
	.card {
		view-transition-name: var(--card-name);
		container-type: inline-size;
		font-family: serif;
		aspect-ratio: 9 / 14;
		width: 100%;
		max-height: 100%;
		color: black;
		&.no-click {
			cursor: default;
		}

		&.suit-diamonds,
		&.suit-hearts {
			color: red;
		}
		&.disabled {
			.wrapper {
				background: #cccccc;
			}
		}
		&.trump .wrapper {
			border-width: 4cqw;
			border-color: gold;
		}
	}

	.wrapper {
		width: 100%;
		height: 100%;
		background: var(--bg-card);
		border-radius: 8cqw;
		position: relative;
		box-shadow: 2cqw 2cqw 4cqw rgba(0, 0, 0, 0.3);
		border-width: 2cqw;
		border-color: black;
	}

	.corner {
		position: absolute;
		padding: 0.4em;
		display: flex;
		flex-direction: column;
		gap: 8cqw;
		align-items: center;

		.value {
			font-size: 20cqw;
		}
		.suit {
			font-size: 14cqw;
		}

		&.top {
			top: 0;
			left: 0;
		}
		&.bottom {
			bottom: 0;
			right: 0;
			rotate: 180deg;
		}
	}
</style>
