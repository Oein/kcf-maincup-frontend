import { writable } from 'svelte/store';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface Root {
	id: string;
	token: string;
	password: string;
	name: string;
	schoolId: string;
	roomId: string;
	room: string;
	school: string;
}

export type UT = Root | null;

export const userData = writable<UT>(null);
