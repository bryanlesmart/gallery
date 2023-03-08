import { router } from './lib/trpc/root';
import { createContext } from './lib/trpc/t';
import { fail, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { auth } from './lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';

export const customHandle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export const handle = sequence(
	handleHooks(auth),
	customHandle,
	createTRPCHandle({
		router,
		createContext,
		onError({ error, path }) {
			if (error.code === 'NOT_FOUND' || error.code === 'INTERNAL_SERVER_ERROR') {
				console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
				throw fail(500, { message: 'Not Found' });
			}
		}
	})
);
