<script>
	import { Button, Input } from '@team.poi/svelteui';
	import axios from '@/lib/axios';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	let id = '';
	let pw = '';

	const onSignin = async () => {};
</script>

<div class="main">
	<div class="ex">
		<div class="g" />
		<h1 class="x">회원가입</h1>
		<div>반가워요!</div>
		<div class="g" />
		<slot />
	</div>
</div>

<style lang="scss">
	.g {
		height: var(--GAP-HALF);
	}
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: calc(100dvh - 3.5rem);
		height: calc(100vh - 3.5rem);
	}
	.ex {
		width: min(95vw, 500px);
		height: fit-content;
		background: var(--LAYER_BACKGROUND);
		padding: var(--GAP-THIN) var(--GAP-HALF);
		box-sizing: border-box;
		border-radius: var(--RADIUS-NORMAL);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.x {
		margin: 0px;
		padding: 0px;
	}
</style>
