<script>
	import { goto } from '$app/navigation';
	import { Button, Checkbox } from '@team.poi/svelteui';
	import toast from 'svelte-french-toast';

	let showingModal = false;
	let agree = typeof history != 'undefined' ? history.state.tosAgree || false : false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="r">
		<div class="r rx">
			<Checkbox bind:enabled={agree} />
			<span>약관에 동의 합니다</span>
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			on:click={(e) => {
				e.preventDefault();
				showingModal = true;
			}}
			class="vt">약관 보기</a
		>
	</div>
	<div class="r rw">
		<div>
			혹시 계정이 있으신가요?
			<a href="/auth/signin">로그인</a>
		</div>
		<Button
			on:click={() => {
				if (!agree) return toast.error('약관에 동의해주세요');
				goto('/auth/signup/2', {
					state: {
						...history.state,
						tosAgree: agree
					}
				});
			}}>다음으로</Button
		>
	</div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`modalW ${showingModal && 'enabled'}`}
	on:click={() => {
		showingModal = false;
	}}
>
	<div
		class="modal"
		on:click={(e) => {
			e.stopImmediatePropagation();
			e.stopPropagation();
		}}
	>
		약관을 준비하고 있어요!
	</div>
</div>

<style lang="scss">
	.vt {
		cursor: pointer;
		user-select: none;
	}
	.g {
		height: var(--GAP-HALF);
	}
	.modalW {
		width: 100vw;
		height: 100vh;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		backdrop-filter: blur(5px) brightness(1.8);
		background: rgba($color: #000000, $alpha: 0.2);

		position: fixed;
		z-index: 213;

		opacity: 0;

		transition: var(--TRANSITION-NORMAL);

		user-select: none;
		pointer-events: none;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modalW.enabled {
		opacity: 1;
		pointer-events: all;
	}
	.modal {
		background: var(--LAYER_BACKGROUND);
		box-shadow: var(--SHADOW-NORMAL);
		padding: var(--GAP-MAIN);
		border-radius: var(--RADIUS-NORMAL);
		width: fit-content;
		height: fit-content;
	}
	.r {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: var(--GAP-HALF);
		width: 100%;
	}
	.rx {
		width: fit-content;
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
