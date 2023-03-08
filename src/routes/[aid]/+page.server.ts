import { redirect } from '@sveltejs/kit';
import { handleActionErrors } from '$lib/utils';
import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/root';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const id = event.params.aid;
	return {
		article: await router.createCaller(await createContext(event)).article.getArticle({ id })
	};
};

export const actions: Actions = {
	updateArticle: async (event) => {
		const body = await Object.fromEntries(await event.request.formData());
		try {
			await router.createCaller(await createContext(event)).article.updateArticle(body);
		} catch (e) {
			return handleActionErrors(e, body);
		}
		throw redirect(301, '/');
	}
};
