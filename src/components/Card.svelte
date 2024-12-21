<script lang="ts">
	import { type Card, SuitEmoji, SuitName, ValueName, ValueSymbol } from '$lib/types/Card';

	type Variant = 'default' | 'disabled';
	type Props = {
		card: Card;
		variant?: Variant;
		orientation: 'front' | 'back';
		onclick?: () => void;
	};

	const { card, variant = 'default', orientation = 'front', onclick }: Props = $props();
	const label = $derived(`${ValueName[card.value]} of ${SuitName[card.suit]}`);
</script>

<button class="card {variant === 'disabled' ? 'disabled' : ''}" aria-label={label} {onclick}>
	<div class="value">{ValueSymbol[card.value]}</div>
	<div class="suit">{SuitEmoji[card.suit]}</div>
</button>

<style>
	.card {
		border-radius: 5px;
		aspect-ratio: 9 / 14;
		width: 100%;
		border: 1px solid gray;
		background: #fffdf4;
	}
	.card.disabled {
		background: lightgray;
	}
	.value {
		font-size: 2em;
	}
</style>
