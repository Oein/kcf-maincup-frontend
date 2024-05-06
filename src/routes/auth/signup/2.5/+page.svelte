<script>
	import { goto } from '$app/navigation';
	import { Button, Input } from '@team.poi/svelteui';
	import toast from 'svelte-french-toast';

	let pw = typeof history != 'undefined' ? history.state.name || '' : '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<Input placeholder="실명" bind:value={pw} />
	<div class="g" />

	<div class="r rw">
		<Button
			on:click={() => {
				if ([pw.length].includes(0)) return toast.error('이름을 입력해 주세요.');
				goto('/auth/signup/3', {
					state: {
						...history.state,
						name: pw
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
