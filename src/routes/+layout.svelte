<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="h-screen w-screen overflow-hidden p-16">
	<div class="relative h-full w-full rounded-xl bg-[--bg-board] shadow-xl">
		{@render children()}
	</div>
</main>
