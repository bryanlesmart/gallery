import { redirect } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/root';
import { handleActionErrors } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({locals}) => {
	const session = await locals.validate();
	if (!session) throw redirect(303, '/');
}) satisfies PageServerLoad;

export const actions: Actions = {
	createArticle: async (event) => {
		const formData = await event.request.formData();
		const body: { [key: string]: unknown } = {};

		const image = formData.get('image') as File | null;

		// Remove image from body if empty or zero
		if (!image || image.length === 0) {
			formData.delete('image');
		}

		for (const [key, value] of formData.entries()) {
			if (key === 'image' && !(value instanceof File)) {
				continue; // skip if not a file object
			}
			if (value instanceof File && value.size === 0) {
				continue;
			}
			if (value instanceof File) {
				body[key] = value;
			} else {
				body[key] = value.toString();
			}
		}
		const articleBody: { userId: string; title: string; content?: string; image?: File } =
			body as never;

		try {
			await router.createCaller(await createContext(event)).article.createArticle(articleBody);
		} catch (e) {
			console.log(e);
			return handleActionErrors(e, articleBody);
		}

		throw redirect(302, '/');
	}
};
