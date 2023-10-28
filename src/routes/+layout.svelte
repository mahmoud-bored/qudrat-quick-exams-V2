<script>
	import { fade } from 'svelte/transition';

	export let data;
</script>

{#key data.pathname}
	<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		<slot />
	</div>
{/key}