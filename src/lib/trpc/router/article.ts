import { destroy, uploadImage } from '$lib/utils/cloudinary';
import { z } from 'zod';
import { articleSchema, updateArticleSchema } from './../../utils/schema/articleSchema';
import { createTRPCRouter, protectedProcedure, publicProcedure } from './../t';
import type { ArticleData } from '$lib/utils/types/';

export const articleRouter = createTRPCRouter({
	createArticle: protectedProcedure
		.input(articleSchema)
		.mutation(async ({ input: { title, content, image }, ctx: { prisma, session } }) => {
			const data: ArticleData = {
				userId: session.userId,
				title,
				content
			};
			if (image) {
				const { result } = await uploadImage(image as File, 'article');
				data['image'] = {
					create: {
						url: result.url,
						publicId: result.public_id,
						format: result.format,
						version: result.version.toString(),
						signature: result.signature
					}
				};
			}
			return await prisma.article.create({
				data
			});
		}),
	getAllArticle: publicProcedure.query(async ({ ctx: { prisma } }) => {
		return await prisma.article.findMany({
			include: {
				user: true,
				image: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
	}),
	deleteArticleById: protectedProcedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.mutation(async ({ input: { id }, ctx: { prisma } }) => {
			const article = await prisma.article.findFirst({
				where: {
					id
				},
				include: {
					image: true
				}
			});
			console.log(article?.image?.publicId);
			await destroy(article?.image?.publicId as string);
			return await prisma.article.delete({
				where: {
					id
				}
			});
		}),
	getArticle: protectedProcedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.mutation(async ({ input: { id }, ctx: { prisma } }) => {
			return await prisma.article.findUnique({
				where: {
					id
				}
			});
		}),
	updateArticle: protectedProcedure
		.input(updateArticleSchema)
		.mutation(async ({ input: { id, title, content }, ctx: { prisma } }) => {
			return await prisma.article.update({
				where: {
					id
				},
				data: {
					title,
					content
				}
			});
		})
});
