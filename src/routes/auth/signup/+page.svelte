<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (typeof window != 'undefined') goto('/auth/signup/1');
	});
</script>
