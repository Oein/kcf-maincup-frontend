<script lang="ts">
	import { setToken } from '@/lib/axios';
	import { userData, type UT } from '@/lib/user';
	import Icon from '@iconify/svelte';
	import { Container } from '@team.poi/svelteui';

	let menuOpened = false;
	let user: UT = null;

	userData.subscribe((x) => {
		user = x;
		console.log(x);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="heading">
	<Container>
		<div class="wrapper">
			<div class="l">
				<a href="/" class="ax">
					<h2 class="title">
						<span class="rw">
							<span>S</span>
							<span class="">chool</span>
						</span>
						<span>&nbsp;</span>
						<span>24</span>
					</h2>
				</a>
			</div>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="r">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => {
						menuOpened = true;
					}}
				>
					<Icon icon="material-symbols:menu" height={'1.5rem'} style="cursor: pointer;" />
				</div>
			</div>
		</div>
	</Container>
</div>
<div class="p" />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`menuw  ${menuOpened && 'enabled'}`}
	on:click={(e) => {
		e.stopImmediatePropagation();
		e.stopPropagation();
		menuOpened = false;
	}}
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`menu ${menuOpened && 'enabled'}`}
	on:click={(e) => {
		e.stopImmediatePropagation();
		e.stopPropagation();
	}}
>
	<h1>안녕하세요{user != null ? ' ' + user.name + '님' : ''}!</h1>
	{#if user == null}
		<a href="/auth/signin" class="it">로그인</a>
	{:else}
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			on:click={() => {
				setToken(null);
			}}
			class="it">로그아웃</a
		>
		<a href="/mypage" class="it">마이 페이지</a>
	{/if}
	<a href="/community/list" class="it">커뮤니티</a>
</div>

<style lang="scss">
	.it {
		font-size: 1.25rem;
		display: block;
		padding: var(--GAP-THIN) 0px;
		cursor: pointer;
	}
	.ax {
		color: var(--COLORS-TEXT);
	}
	.menuw {
		display: flex;
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
		pointer-events: none;
		user-select: none;
		opacity: 0;
		transition: var(--TRANSITION-NORMAL);
	}
	.menuw.enabled {
		pointer-events: all;
		opacity: 1;
	}
	.menu {
		h1 {
			padding-top: 0px;
			margin-top: 0px;
		}
		color: var(--COLORS-TEXT);
		padding: var(--GAP-HALF);
		position: fixed;
		top: 0px;
		bottom: 0px;
		width: min(100vw, 400px);
		opacity: 0;
		right: -100%;
		background: var(--LAYER_BACKGROUND);
		transition: var(--TRANSITION-NORMAL);
		z-index: 101;
	}
	.menu.enabled {
		opacity: 1;
		right: 0%;
	}

	.p {
		height: 3.5rem;
	}
	.heading {
		box-shadow: var(--SHADOW-LIGHT);
		color: var(--COLORS-TEXT);
		height: 3.5rem;
		width: 100vw;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		background: var(--LAYER_BACKGROUND);
		padding: 0px var(--GAP-HALF);
		box-sizing: border-box;
		border-radius: 0px 0px 1rem 1rem;
	}
	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		cursor: pointer;
		margin: 0px;
		padding: 0px;
		width: fit-content;

		display: flex;
		flex-direction: row;
		gap: 0px;
		span {
			padding: 0px;
		}
		.rw {
			display: flex;
			flex-direction: row;
		}
	}

	@media (cursor: none) {
		.hovview {
			max-width: 7em;
		}
	}
	@media (cursor: coarse) {
		.hovview {
			max-width: 7em;
		}
	}
	@media (hover: none) {
		.hovview {
			max-width: 7em;
		}
	}
</style>
