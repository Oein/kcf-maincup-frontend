<script lang="ts">
	// @ts-ignore
	// @ts-nocheck
	import { Button, Card, Container, Input } from '@team.poi/svelteui';
	import { onMount } from 'svelte';
	import axios from '@/lib/axios';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	let Editor;
	onMount(async () => {
		const Editorx = await import('@tinymce/tinymce-svelte');
		Editor = Editorx.default;
	});

	let v = '';
	let title = '';

	const submit = async () => {
		let data = await axios.post('/post/new', {
			body: {
				title: title,
				content: v,
				token: localStorage.getItem('token')
			}
		});
		if (data.data.s == true) {
			toast.success('성공적으로 글을 작성하였습니다');
			goto('/community/list');
		} else {
			toast.error('글 작성에 실패하였습니다');
		}
	};
</script>

<Container>
	<h1>글쓰기</h1>
	<Input placeholder="제목" bind:value={title} />
	<div class="g" />
	<svelte:component this={Editor} bind:value={v} />
	<div class="g" />
	<div class="r">
		<Button on:click={submit}>작성</Button>
	</div>
</Container>

<style lang="scss">
	.g {
		height: var(--GAP-HALF);
	}
	.r {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 100%;
		box-sizing: border-box;
	}
</style>
