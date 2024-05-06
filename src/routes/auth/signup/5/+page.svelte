<script lang="ts">
	import { goto } from '$app/navigation';
	import { Loading } from '@team.poi/svelteui';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import axios, { setToken } from '@/lib/axios';
	import fetchAccData from '@/lib/fetchAccData';

	onMount(async () => {
		if (typeof history == 'undefined') return;
		if (
			[
				history.state.sc,
				history.state.id,
				history.state.pw,
				history.state.tosAgree,
				history.state.grade,
				history.state.classNum,
				history.state.name
			].includes(undefined)
		) {
			toast.error('잘못된 접근입니다');
			return goto('/auth/signup/1');
		}

		const schoolID: string = history.state.sc;
		const id: string = history.state.id;
		const pw: string = history.state.pw;
		const tosAgree: boolean = history.state.tosAgree;
		const grade: number = parseInt(history.state.grade);
		const classNum: number = parseInt(history.state.classNum);
		const name: string = history.state.name;
		let data = await axios.post('/auth/signup', {
			body: {
				schoolID: schoolID,
				id: id,
				pw: pw,
				grade: grade,
				classNum: classNum,
				name: name
			}
		});
		if (!data || !data.data) return;
		if ((data.data as any).s) {
			setToken((data.data as any).data);
			await fetchAccData();
			toast.success('회원가입이 완료되었습니다');
			goto('/');
		} else {
			toast.error('회원가입이 실패하였습니다');
			goto('/auth/signup');
		}
	});
</script>

<div class="r">
	<Loading size="5rem" />
	<div>잠시만 기다려 주세요. 서버에 정보를 등록하고 있어요.</div>
</div>

<style lang="scss">
	.r {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: var(--GAP-HALF) 0px;
	}
</style>
