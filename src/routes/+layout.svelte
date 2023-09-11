<script>
	import '@/styles/global.css';
	import { ThemeProvider } from 'ui';
</script>

<div class="App">
	<ThemeProvider>
		<slot />
	</ThemeProvider>
</div>
