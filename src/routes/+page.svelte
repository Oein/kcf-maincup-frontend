<script lang="ts">
	import { Card, Container } from '@team.poi/svelteui';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import axios from '@/lib/axios';
	import { goto } from '$app/navigation';
	import fetchAccData from '@/lib/fetchAccData';

	let ComList: {
		title: string;
		userId: string;
		id: string;
	}[] = [];
	let userCnt = 0;
	let chatCnt = 0;
	onMount(async () => {
		let data: any = (await axios.get('/recent')).data;
		ComList = data.data.ourPost;
		userCnt = data.data.userCnt;
		chatCnt = data.data.postCnt;
	});

	let msg = '';
	let msgs: string[] = ['24시간 친구들과 함께', '학교생활을 즐겁게'];

	let msgKf: string[] = [];
	for (let i = 0; i < msgs.length; i++) {
		let created = '';
		for (let j = 0; j < msgs[i].length; j++) {
			created += msgs[i].charAt(j);
			msgKf.push(created);
		}
		for (let j = 0; j < 20; j++) {
			msgKf.push(msgs[i]);
		}
		while (created.length > 0) {
			created = created.slice(0, -1);
			if (created.length == 0) break;
			msgKf.push(created);
		}
		for (let j = 0; j < 10; j++) {
			msgKf.push('&nbsp;');
		}
	}

	onMount(() => {
		let kf = 0;
		let inter = setInterval(() => {
			kf += 1;
			if (kf >= msgKf.length) kf = 0;
			msg = msgKf[kf];
		}, 50);
		return () => {
			clearInterval(inter);
		};
	});
</script>

<Container style="margin-top: 3.5rem;">
	<div class="saero">
		<Card style="width: 100%; box-sizing: border-box;">
			<h1 class="tit">School 24</h1>
			<div class="desc">{@html msg}</div>
		</Card>
		<div class="garo f1">
			<Card style="flex: 1;">
				<Icon icon="mdi:user" color={'var(--COLORS-SUCCESS)'} height={'2rem'} />
				<div class="infot">
					<span>{userCnt}</span>명의 학생들이 함께하고 있어요
				</div>
			</Card>
			<Card style="flex: 1;">
				<Icon icon="material-symbols:chat" color={'var(--COLORS-PRIMARY)'} height={'2rem'} />
				<div class="infot">
					<span>{chatCnt}</span>개의 대화들이 오고갔어요
				</div>
			</Card>
		</div>
		<Card style="width: 100%; box-sizing: border-box;">
			<div class="r">
				<h1 class="sectit">우리들의 대화</h1>
				<a href="/community/list">커뮤니티로 이동</a>
			</div>
			<table class="tble">
				<thead>
					<th> 제목 </th>
					<th> 닉네임 </th>
				</thead>
				<tbody>
					{#each ComList as list}
						<tr
							on:click={() => {
								goto('/community/p/' + list.id);
							}}
							style="cursor: pointer;"
						>
							<td>{list.title}</td>
							<td>{list.userId}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Card>
	</div>
</Container>

<style lang="scss">
	.r {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--COMPONENT-PLACEHOLDER);
	}
	.sectit {
		margin: 0px;
		padding: 0px;
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
			}
			tr:nth-child(odd) {
				background: var(--BACKGROUND);
			}
		}
	}

	.saero,
	.garo {
		display: flex;
		flex-direction: column;
		gap: var(--GAP-MAIN);
	}
	.garo {
		flex-direction: row;
	}
	.tit {
		text-align: center;

		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: var(--GRIDIENT-PRIMARY);
		font-size: 4rem;
		margin: 0px;
		padding: 0px;
	}
	.desc {
		text-align: center;
	}
	.infot {
		font-size: 1.25rem;

		span {
			font-weight: bolder;
		}
	}
</style>
