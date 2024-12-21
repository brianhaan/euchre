<script lang="ts">
	import { type Card, SuitEmoji, SuitName, ValueName, ValueSymbol, Value } from '$lib/types/Card';

	type Variant = 'default' | 'disabled';
	type Props = {
		card: Card;
		variant?: Variant;
		orientation?: 'front' | 'back';
		onclick?: () => void;
	};

	const { card, variant = 'default', orientation = 'front', onclick }: Props = $props();
	const valueName = $derived(ValueName[card.value]);
	const suitName = $derived(SuitName[card.suit]);
	const label = $derived(`${valueName} of ${suitName}`);
</script>

<button
	class="card {variant === 'disabled'
		? 'disabled'
		: ''} suit-{suitName.toLowerCase()} value-{valueName.toLowerCase()} {typeof onclick ===
	'undefined'
		? 'no-click'
		: ''}"
	aria-label={label}
	{onclick}
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
		container-type: inline-size;
		font-family: serif;
		aspect-ratio: 9 / 14;
		width: 100%;
		min-width: 100px;
		color: black;
		&.no-click {
			cursor: normal;
		}

		&.suit-diamonds,
		&.suit-hearts {
			color: red;
		}
		&.disabled {
			background: lightgray;
		}
	}

	.wrapper {
		width: 100%;
		height: 100%;
		background: var(--bg-card);
		border-radius: 8cqw;
		position: relative;
		box-shadow: 4cqw 4cqw 4cqw rgba(0, 0, 0, 0.3);
		border: 2px solid black;
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
