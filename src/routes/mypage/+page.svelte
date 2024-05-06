<script lang="ts">
	import { Card, Container, Input } from '@team.poi/svelteui';
	import { userData, type UT } from '@/lib/user';
	import { onMount } from 'svelte';
	import { token } from '@/lib/axios';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import toast from 'svelte-french-toast';
	let user: UT = null;
	userData.subscribe((x) => {
		user = x;
	});

	onMount(() => {
		if (typeof window == 'undefined') return;
		if (token == null) goto('/auth/signin');
	});
</script>

<Container>
	<h1>마이페이지</h1>
	{#if user != null}
		<Card style="width: 100%; box-sizing: border-box;">
			<Input readonly placeholder="이름" bind:value={user.name} />
			<div class="g" />
			<Input readonly placeholder="학년" value={user.room.split('-')[0] || ''} />
			<div class="g" />
			<Input readonly placeholder="반" value={user.room.split('-')[1] || ''} />
			<div class="g" />
			<Input readonly placeholder="학교" value={user.school} />
			<div class="g" />
		</Card>
	{/if}
</Container>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<a
	class="rn"
	on:click={() => {
		toast.error('이 기능은 관리자를 통해 접근해 주세요.');
	}}
>
	<Icon icon="material-symbols:edit-outline" height={'1.7rem'} />
</a>

<style lang="scss">
	.rn {
		color: white;
		display: flex;
		position: fixed;
		bottom: var(--GAP-MAIN);
		right: var(--GAP-MAIN);
		border-radius: var(--RADIUS-MAXIMUM);
		background: var(--COLORS-PRIMARY);
		padding: var(--GAP-THIN);
	}

	.g {
		height: var(--GAP-HALF);
	}
</style>
