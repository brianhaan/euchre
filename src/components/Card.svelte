<script lang="ts">
	import { type Card, SuitEmoji, ValueSymbol } from '$lib/types/Card';
	type Variant = 'default' | 'disabled';

	let {
		card,
		variant = 'default',
		onclick
	}: { card: Card; variant?: Variant; onclick?: () => void } = $props();
	let { suit, value } = $derived(card);
</script>

<button class="card" aria-label="" {onclick}>
	<div class="value">{ValueSymbol[value]}</div>
	<div class="suit">{SuitEmoji[suit]}</div>
</button>

<style>
	.card {
		border-radius: 5px;
		aspect-ratio: 9 / 14;
		width: 100%;
		border: 1px solid gray;
		background: #fffdf4;
	}
	.value {
		font-size: 2em;
	}
</style>
