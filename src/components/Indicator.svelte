<script lang="ts">
	type Props = {
		variant: 'dealer' | 'maker';
	};

	const { variant }: Props = $props();
</script>

{#if variant === 'dealer'}
	<span
		class="indicator"
		aria-label="Dealer"
		title="Dealer"
		style:--indicator-name="indicator-dealer">🔵</span
	>
{:else}
	<span class="indicator" aria-label="Maker" title="Maker" style:--indicator-name="indicator-maker"
		>🟡</span
	>
{/if}

<style>
	.indicator {
		view-transition-name: var(--indicator-name);
		scale: 0.5;
		@media screen and (min-width: 640px) and (min-height: 640px) {
			scale: 0.7;
		}
		@media screen and (min-width: 960px) and (min-height: 960px) {
			scale: 0.9;
		}
		@media screen and (min-width: 1280px) and (min-height: 1280px) {
			scale: 1;
		}
	}
</style>
