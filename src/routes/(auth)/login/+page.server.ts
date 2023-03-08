import { redirect } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/root';
import { handleActionErrors } from '$lib/utils';
import type { PageServerLoad, Actions } from './$types';
import type { Session } from 'lucia-auth';

export const load = (async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(303, '/');
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async (event) => {
		const body = await Object.fromEntries(await event.request.formData());
		try {
			const session = await router.createCaller(await createContext(event)).user.loginUser(body);
			event.locals.setSession(session as Session);
		} catch (e) {
			return handleActionErrors(e, body);
		}
		throw redirect(302, '/');
	}
};
