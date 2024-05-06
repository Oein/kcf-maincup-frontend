<script>
	import Header from '@/components/Header.svelte';
	import { setToken } from '@/lib/axios';
	import fetchAccData from '@/lib/fetchAccData';
	import '@/styles/global.css';
	import 'bytemd/dist/index.css';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import { ThemeProvider } from 'ui';

	onMount(() => {
		if (typeof window != 'undefined') {
			if (typeof localStorage != 'undefined') setToken(localStorage.getItem('token'));
			fetchAccData();
		}
	});
</script>

<div class="App">
	<ThemeProvider theme="dark">
		<div class="x">
			<Header />
			<slot />
		</div>
	</ThemeProvider>
	<Toaster position="top-right" />
</div>

<style>
	.x {
		background: var(--BACKGROUND);
		min-height: 100vh;
	}
</style>
