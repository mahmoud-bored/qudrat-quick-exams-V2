<script>
	import { fly } from 'svelte/transition';

	export let data;
</script>

{#key data.pathname}
	<div in:fly={{ y: -600, duration: 300, delay: 400 }} out:fly={{ y: 600, duration: 300 }} style="overflow: hidden; background-color: #333;">
		<slot />
	</div>
{/key}