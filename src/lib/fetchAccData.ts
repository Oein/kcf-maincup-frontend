/* eslint-disable @typescript-eslint/no-explicit-any */
import fetcher, { token } from './axios';
import { userData, type UT } from './user';

export default async function fetchAccData(t?: string | null) {
	// hi
	if (t == null) t = token;
	if (t == null) return;
	const { data } = await fetcher.get('/auth/session', {});
	console.log(data);
	if ((data as any).s == true) userData.set((data as any).data as UT);
}
