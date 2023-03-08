import { createContext } from '$lib/trpc/t';
import { router } from './../../../lib/trpc/root';
import { handleActionErrors } from '$lib/utils';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(303, '/');
}) satisfies PageServerLoad;

export const actions: Actions = {
	register: async (event) => {
		const body = await Object.fromEntries(await event.request.formData());
		try {
			await router.createCaller(await createContext(event)).user.userRegistration(body);
		} catch (e) {
			return handleActionErrors(e, body);
		}
		throw redirect(302, '/login');
	}
};
