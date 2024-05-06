<script>
	import { goto } from '$app/navigation';
	import { Button, Input } from '@team.poi/svelteui';
	import toast from 'svelte-french-toast';
	import axios from '@/lib/axios';

	let id = typeof history != 'undefined' ? history.state.id || '' : '';
	let pw = typeof history != 'undefined' ? history.state.pw || '' : '';
	let pwre = pw;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<Input placeholder="ID" bind:value={id} />
	<div class="g" />
	<Input placeholder="비밀번호" bind:value={pw} TYPE="password" />
	<div class="g" />
	<Input placeholder="비밀번호 재입력" bind:value={pwre} TYPE="password" />
	<div class="g" />

	<div class="r rw">
		<Button
			on:click={async () => {
				if (pw != pwre) return toast.error('비밀번호가 일치하지 않습니다');
				if ([pw.length, id.length].includes(0))
					return toast.error('아이디와 비밀번호를 입력해주세요');
				let data = await axios.post('/auth/check', {
					body: {
						type: 'NICKNAME',
						name: id
					}
				});
				if (!data.data) return toast.error('이미 존재하는 아이디입니다');
				goto('/auth/signup/2.5', {
					state: {
						...history.state,
						id: id,
						pw: pw
					}
				});
			}}>다음으로</Button
		>
	</div>
</div>

<style lang="scss">
	.g {
		height: var(--GAP-HALF);
	}

	.rw {
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: column;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		margin-top: var(--GAP-HALF);
	}
</style>
