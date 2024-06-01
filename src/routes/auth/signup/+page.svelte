<script>
	import { page } from "$app/stores";
	import UnderMaintenance from "$lib/UnderMaintenance.svelte";

	const url = new URL($page.url)

</script>
<UnderMaintenance redirectToUrl={url.searchParams.get('redirectTo')}/>