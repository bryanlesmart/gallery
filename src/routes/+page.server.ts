import { fail } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/root';
import { handleActionErrors } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		articles: await router.createCaller(await createContext(event)).article.getAllArticle()
	};
};

export const actions: Actions = {
	deleteArticle: async (event) => {
		const id = event.url.searchParams.get('id');
		if (!id) return fail(400, { message: 'Invalid Request' });
		try {
			await router.createCaller(await createContext(event)).article.deleteArticleById({ id });
		} catch (e) {
			return handleActionErrors(e);
		}
	}
};
