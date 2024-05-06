/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import fetchAccData from './fetchAccData';
import { userData } from './user';

export const API_BASE = 'http://192.168.0.27:8080';

export let token: string | null =
	typeof localStorage != 'undefined' ? localStorage.getItem('token') : null;

export function setToken(t: string | null) {
	token = t;
	console.log('NEW TOKEN', t);
	if (typeof localStorage != 'undefined') localStorage.setItem('token', t as any);
	if (t == null) userData.set(null);
	else fetchAccData(t);
}

interface Response<T = any> {
	data: T;
	status: number;
	headers?: Headers;
}

interface RequestOptions {
	endpoint: string;
	body?: any;
	method?: string;
	headers?: { [key: string]: string };
	signal?: AbortSignal | null;
	returnType?: 'blob' | 'arraybuffer' | 'raw' | 'text' | 'text_json';
}

class Requester {
	async request(endpoint: string): Promise<Response>;
	async request(req: RequestOptions): Promise<Response>;
	async request(endpoint: string, req: Omit<RequestOptions, 'endpoint'>): Promise<Response>;
	async request(
		req_or_end: RequestOptions | string,
		opt_req?: Omit<RequestOptions, 'endpoint'>
	): Promise<Response> {
		let req: RequestOptions;

		if (typeof req_or_end === 'string' && typeof opt_req == 'undefined')
			req = {
				endpoint: req_or_end as string
			};
		else if (typeof req_or_end === 'string' && typeof opt_req != 'undefined')
			req = {
				...opt_req,
				endpoint: req_or_end as string
			};
		else req = req_or_end as RequestOptions;

		const hasBody = typeof req.body != 'undefined';
		const config: RequestInit = {};
		if (hasBody) {
			if (typeof req.body == 'object') config.body = JSON.stringify(req.body);
			else config.body = req.body;
		}
		config.method = req.method || 'GET';
		config.headers = {
			accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: token || localStorage.getItem('token') || 'undefined',
			...(req.headers || {})
		};
		if (req.endpoint.startsWith('/')) req.endpoint = API_BASE + req.endpoint;
		const res = await fetch(new URL(req.endpoint), config);
		const base = {
			status: res.status,
			headers: res.headers
		};
		if (req.returnType == 'raw')
			return {
				data: res,
				...base
			};
		if (req.returnType === 'blob')
			return {
				data: await res.blob(),
				status: res.status,
				headers: res.headers
			};
		if (req.returnType == 'arraybuffer')
			return {
				data: await res.arrayBuffer(),
				...base
			};
		if (req.returnType == 'text')
			return {
				data: await res.text(),
				...base
			};
		const t = await res.text();
		try {
			return {
				data: JSON.parse(t),
				...base
			};
		} catch (e) {
			return {
				data: t,
				...base
			};
		}
	}

	async post<T>(endpoint: string): Promise<Response<T>>;
	async post<T>(
		endpoint: string,
		postReq: Omit<Omit<RequestOptions, 'method'>, 'endpoint'>
	): Promise<Response<T>>;
	async post<T>(postReq: Omit<RequestOptions, 'method'>): Promise<Response<T>>;
	async post<T>(
		postReq: Omit<RequestOptions, 'method'> | string,
		postReqOpt?: Omit<Omit<RequestOptions, 'method'>, 'endpoint'>
	): Promise<Response<T>> {
		let req: RequestOptions;

		if (typeof postReq == 'string')
			req = {
				...(postReqOpt || {}),
				endpoint: postReq,
				method: 'POST'
			};
		else
			req = {
				...postReq,
				method: 'POST'
			};
		return await this.request(req);
	}

	async get<T>(endpoint: string): Promise<Response<T>>;
	async get<T>(
		endpoint: string,
		postReq: Omit<Omit<RequestOptions, 'method'>, 'endpoint'>
	): Promise<Response<T>>;
	async get<T>(postReq: Omit<RequestOptions, 'method'>): Promise<Response<T>>;
	async get<T>(
		postReq: Omit<RequestOptions, 'method'> | string,
		postReqOpt?: Omit<Omit<RequestOptions, 'method'>, 'endpoint'>
	): Promise<Response<T>> {
		let req: RequestOptions;

		if (typeof postReq == 'string')
			req = {
				...(postReqOpt || {}),
				endpoint: postReq,
				method: 'GET'
			};
		else
			req = {
				...postReq,
				method: 'GET'
			};
		return await this.request(req);
	}
}

type RequesterInstance = (<T>(req: RequestOptions) => Promise<Response<T>>) &
	(<T>(endpoint: string) => Promise<Response<T>>) &
	(<T>(endpoint: string, req: Omit<RequestOptions, 'endpoint'>) => Promise<Response<T>>) &
	Requester;

const createInstance = (): RequesterInstance => {
	const instance: any = new Requester();
	const res: any = instance.request;
	Object.getOwnPropertyNames(Requester.prototype)
		.filter((x) => x != 'constructor')
		.forEach((k) => {
			res[k] = instance[k];
		});
	return res;
};

const fetcher = createInstance();
export default fetcher;
