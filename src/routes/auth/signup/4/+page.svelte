<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Input } from '@team.poi/svelteui';
	import toast from 'svelte-french-toast';

	let grade = '';
	let classNum = '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<Input placeholder="학년" bind:value={grade} style="flex: 1;" />
	<div class="g" />
	<Input placeholder="반" bind:value={classNum} style="flex: 1;" />
	<div class="g" />
	<div class="r rw">
		<Button
			on:click={() => {
				if (grade == '' || classNum == '') return toast.error('학년과 반을 입력해주세요');
				if (!grade.match(/^[0-9]+$/)) return toast.error('학년은 숫자만 입력해주세요');
				if (!classNum.match(/^[0-9]+$/)) return toast.error('반은 숫자만 입력해주세요');
				goto('/auth/signup/5', {
					state: {
						...history.state,
						grade: grade,
						classNum: classNum
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
