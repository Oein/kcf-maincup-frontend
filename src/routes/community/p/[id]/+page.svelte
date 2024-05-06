<script lang="ts">
	import { Button, Card, Container, Input } from '@team.poi/svelteui';
	import axios from '@/lib/axios';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	export let data;
	let com = '';
	let body = '';
	let tit = '';
	let coms: any[] = [];
	onMount(async () => {
		if (typeof window == 'undefined') return;
		const res = await axios.post('/post/get', {
			body: {
				id: data.id
			}
		});
		const x = res.data as any;
		coms = x.data.comm;
		body = x.data.content;
		tit = x.data.title;
	});
	const sendComment = async () => {
		const res = axios.post('/comm/new', {
			body: {
				content: com,
				postId: data.id
			}
		});
		console.log(res);
		invalidateAll();
	};
</script>

<Container>
	<div class="g" />
	<Card style="width: 100%; box-sizing: border-box;">
		<h1 class="tit">{tit}</h1>
	</Card>
	<div class="g" />
	<Card style="width: 100%; box-sizing: border-box;">
		{@html body}
	</Card>
	<div class="g" />
	<Card style="width: 100%; box-sizing: border-box;">
		<h2 class="tit">댓글</h2>
		<div class="g" />
		<Input placeholder="댓글" bind:value={com} />
		<div class="g" />
		<div class="r">
			<Button on:click={sendComment}>올리기</Button>
		</div>
		<div class="g" />
		{#each coms as chat}
			<div class="chat">
				<div class="auth">{chat.user.name}</div>
				<div class="chati">{chat.content}</div>
			</div>
		{/each}
	</Card>
	<div class="g" />
</Container>

<style lang="scss">
	.r {
		display: flex;
		justify-content: flex-end;
		flex-direction: row;
	}
	.chat {
		padding: var(--GAP-THIN);
	}
	.auth {
		font-weight: bolder;
		font-size: 1.1em;
	}
	.chati {
		padding-left: var(--GAP-HALF);
	}
	.tit {
		margin: 0px;
		padding: 0px;
	}
	.g {
		height: var(--GAP-HALF);
	}
</style>
