import { z } from 'zod';
import { zfd } from '../zfd';

export const articleSchema = zfd.formData({
	title: zfd.text(z.string({ required_error: 'Title is required' })),
	content: z.nullable(z.string()),
	image: z.optional(zfd.file())
});

export const updateArticleSchema = zfd.formData({
	id: zfd.text(z.string()),
	title: zfd.text(z.string({ required_error: 'Title is required' })),
	content: z.nullable(z.string())
});
