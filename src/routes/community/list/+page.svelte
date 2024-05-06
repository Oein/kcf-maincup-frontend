<script lang="ts">
	import { Button, Card, Checkbox, Container, Input } from '@team.poi/svelteui';
	import axios, { token } from '@/lib/axios';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	let searchKeyword = '';

	let onNew: ((s: string) => void)[] = [];
	let pg = 0;
	let fetching = false;

	let searchResult: {
		title: string;
		content: string;
		userId: string;
		id: string;
	}[] = [];
	let sc = false;

	const fetch = async (sk: string, sc: boolean) => {
		fetching = true;
		const abortController = new AbortController();
		let abort = false;
		const ex = (s: string) => {
			abortController.abort();
			abort = true;
			onNew = onNew.filter((x) => x != ex);
		};
		onNew.push(ex);
		const fet = await axios('/post/list', {
			method: 'POST',
			body: JSON.stringify({
				searchKeyword: sk,
				page: pg,
				sc: token == null ? false : sc
			}),
			signal: abortController.signal
		});
		if (abort) return;
		searchResult = [...searchResult, ...(fet.data as any).data];
		fetching = false;
	};

	let searchInterval: number | null = null;
	let old = '';

	const tryFNext = () => {
		if (fetching) return;
		pg++;
		if (searchInterval != null) clearInterval(searchInterval);
		fetch(searchKeyword, sc);
	};

	let oldSC = false;

	const onC = () => {
		if (old != searchKeyword || oldSC != sc) {
			old = searchKeyword;
			oldSC = sc;
		} else return;
		searchResult = [];
		pg = 0;
		onNew.forEach((x) => x(searchKeyword));
		if (searchInterval != null) clearInterval(searchInterval);
		searchInterval = setTimeout(() => {
			fetch(searchKeyword, sc);
		}, 50);
	};

	onMount(() => {
		fetch(searchKeyword, sc);
	});

	$: {
		if (token == null && sc == true) {
			sc = false;
			toast.error('로그인 시에만 사용할 수 있는 기능 입니다');
		}
		onC();
	}
</script>

<Container>
	<h1>커뮤니티</h1>
	<Card style="width: 100%; box-sizing: border-box;">
		<div>검색 필터</div>
		<Input
			placeholder="검색어"
			bind:value={searchKeyword}
			on:change={onC}
			on:keydown={onC}
			on:keyup={onC}
			on:input={onC}
		/>
		<div class="g" />
		<div class="r">
			<Checkbox bind:enabled={sc} onClick={onC} />
			<span>우리 학교글만 보기</span>
		</div>
	</Card>
	<div class="g" />
	<Card style="width: 100%; box-sizing: border-box;">
		<div>검색 결과</div>
		<table class="tble">
			<thead>
				<th> 제목 </th>
				<th> 작성자 </th>
			</thead>
			<tbody>
				{#each searchResult as list}
					<tr
						on:click={() => {
							goto('/community/p/' + list.id);
						}}
					>
						<td>{list.title}</td>
						<td>{list.userId}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="g" />
		<div
			class="x"
			style="width: 100%; display: flex; justify-content: stretch; align-items: stretch; flex-direction: row;"
		>
			<Button
				on:click={(e) => {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
					tryFNext();
				}}
				style="width: 100%; box-sizing: border-box;"
				rippleStyle="width: 100%; box-sizing: border-box;">다음 페이지 불러오기</Button
			>
		</div>

		<div class="g" />
	</Card>
</Container>

<a class="rn" href="/community/new">
	<Icon icon="ic:baseline-plus" height={'1.7rem'} />
</a>

<style lang="scss">
	.r {
		display: flex;
		gap: var(--GAP-HALF);
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
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

	.tble {
		table-layout: auto;
		width: 100%;
		border-collapse: collapse;

		thead {
			th {
				text-align: left;
				border: none;
				margin: 0px;
				padding: 0px;
				outline: none;
				padding: var(--GAP-HALF);
			}
		}
		tbody {
			tr {
				td {
					padding: var(--GAP-THIN) var(--GAP-HALF);
				}
				td:first-child {
					border-radius: var(--RADIUS-NORMAL) 0px 0px var(--RADIUS-NORMAL);
				}
				td:last-child {
					border-radius: 0px var(--RADIUS-NORMAL) var(--RADIUS-NORMAL) 0px;
				}
				cursor: pointer;
			}
			tr:nth-child(odd) {
				background: var(--BACKGROUND);
			}
		}
	}
</style>
