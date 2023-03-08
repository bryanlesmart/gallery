import type { AppRouter } from './root';
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';

const getBaseURL = () => {
	if (typeof window !== 'undefined') return '';
	return `http://localhost:${process.env.PORT ?? 5173} `;
};

export function trpc() {
	const client = createTRPCProxyClient<AppRouter>({
		links: [
			loggerLink(),
			httpBatchLink({
				url: `${getBaseURL()}/trpc`
			})
		]
	});
	return client;
}
