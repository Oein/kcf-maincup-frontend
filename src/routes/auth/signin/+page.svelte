<script>
	import { Button, Input } from '@team.poi/svelteui';
	import axios, { setToken } from '@/lib/axios';
	import toast, { Toaster } from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import fetchAccData from '@/lib/fetchAccData';
	let id = '';
	let pw = '';
	const onSignin = async () => {
		let data = await axios.post('/auth/signin', {
			body: {
				id: id,
				pw: pw
			}
		});
		if (data.data.s == true) {
			setToken(data.data.data);

			await fetchAccData(data.data.data);
			toast.success('로그인에 성공하였습니다!');
			goto('/');
		} else {
			toast.error('로그인에 실패하였습니다!');
		}
	};
</script>

<Toaster />

<div class="main">
	<div class="ex">
		<div class="g" />
		<h1 class="x">로그인</h1>
		<div>다시 오신것을 환영해요!</div>
		<div class="g" />
		<div class="g" />
		<Input placeholder="ID" bind:value={id} />
		<div class="g" />
		<Input placeholder="Password" bind:value={pw} />
		<div class="g" />
		<div>
			혹시 계정이 없으신가요?
			<a href="/auth/signup">회원가입</a>
		</div>
		<div class="r">
			<Button on:click={onSignin}>로그인</Button>
		</div>
	</div>
</div>

<style lang="scss">
	.r {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 100%;
		box-sizing: border-box;
	}
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
