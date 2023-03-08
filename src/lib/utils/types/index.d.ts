export interface Image {
	url?: string;
}

export interface User {
	name: string;
}

export interface Article {
	id: string;
	title: string;
	content?: string | null;
	userId: string;
	image?: Image | null;
	user?: User | null;
}


import type { Article } from '@prisma/client';

export type ArticleData = Partial<Article> & {
	userId: string;
	title: string;
	content: string | null;
	image?: {
		create: {
			url: string;
			publicId: string;
			format: string;
			version: string;
			signature: string;
		};
	};
};