<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="overflow-hidden p-4 sm:p-8 md:p-12 lg:p-16">
	<div class="relative h-full w-full rounded-xl bg-[--bg-board] shadow-xl">
		{@render children()}
	</div>
</main>

<style>
	main {
		height: 100dvh;
		width: 100vw;
	}
</style>
