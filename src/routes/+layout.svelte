<script>
	import { fade, fly } from 'svelte/transition';

	export let data;
</script>

{#key data.pathname}
	<div in:fly={{ y: -300, duration: 300, delay: 300 }} out:fade={{ duration: 300 }} style="overflow: hidden; background-color: #333;">
		<slot />
	</div>
{/key}