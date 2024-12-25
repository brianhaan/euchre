<script lang="ts">
	import type { Position } from '$lib/utilities/getPlayerPosition';

	const { position }: { position: Position } = $props();
</script>

<div class="flex h-full flex-col items-center justify-center {position === 'top' && 'rotate-180'}">
	<div class="text-base sm:text-lg md:text-xl lg:text-2xl">Inactive this Hand</div>
	<div class="text-xs sm:text-sm md:text-base lg:text-lg">Partner is Going Alone</div>
</div>
