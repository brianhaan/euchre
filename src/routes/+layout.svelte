<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="p-2">
	{@render children()}
</main>
