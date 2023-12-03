<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    // Redirect to main page if url not found
    onMount(()=> goto('/'))
</script>