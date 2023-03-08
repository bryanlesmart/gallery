import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC, type inferAsyncReturnType, TRPCError } from '@trpc/server';
import { prisma } from '$lib/server/prisma';

export async function createContext(event: RequestEvent) {
	const { user, session } = await event.locals.validateUser();
	return {
		prisma,
		session,
		user
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<typeof createContext>().create();

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const auth = t.middleware(async ({ ctx, next }) => {
	if (!ctx.session?.userId || !ctx.user?.userId) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: { session: { ...ctx.session, user: ctx.user } }
	});
});

export const protectedProcedure = t.procedure.use(auth);

/**
 * 
 * createArticle: protectedProcedure
		.input(articleSchema)
		.mutation(async ({ input: { title, content, image }, ctx: { prisma, session } }) => {
			const data = {
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
 * 
 */
