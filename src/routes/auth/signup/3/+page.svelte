<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Input } from '@team.poi/svelteui';
	import toast from 'svelte-french-toast';
	import axios from '@/lib/axios';

	let sc = typeof history != 'undefined' ? history.state.sc || '' : '';

	let schoolList: {
		name: string;
		id: string;
	}[] = [];

	const refr = async () => {
		schoolList = (
			(
				await axios.post('/auth/check', {
					body: {
						type: 'SCHOOL',
						name: sc
					}
				})
			).data as any
		).data as any;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<Input placeholder="학교 이름" bind:value={sc} on:change={refr} />
	<div class="g" />
	{#each schoolList as school}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="sc"
			on:click={() => {
				goto('/auth/signup/4', {
					state: {
						...history.state,
						sc: school.id
					}
				});
			}}
		>
			{school.name}
		</div>
	{/each}
</div>

<style lang="scss">
	.g {
		height: var(--GAP-HALF);
	}
	.sc {
		padding: var(--GAP-THIN);
		cursor: pointer;
		transition: var(--TRANSITION-NORMAL);
		border-radius: var(--RADIUS-NORMAL);
	}
	.sc:hover {
		box-shadow: var(--SHADOW-NORMAL);
	}
	.sc:nth-child(odd) {
		background: var(--BACKGROUND);
	}
</style>
