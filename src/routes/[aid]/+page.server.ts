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
		const formData = await event.request.formData();
		const body: { [key: string]: unknown } = {};

		const image = formData.get('image') as File | null;

		// Remove image from body if empty or zero
		if (!image === null || image?.length === 0) {
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
		const articleBody: {
			id: string;
			publicId?: string;
			title: string;
			content?: string;
			image?: File;
		} = body as never;

		try {
			await router.createCaller(await createContext(event)).article.updateArticle(articleBody);
		} catch (e) {
			console.log(e);
			return handleActionErrors(e, articleBody);
		}
		throw redirect(302, '/');
	}
};
