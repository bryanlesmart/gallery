import { TRPCError } from '@trpc/server';
import { auth } from '$lib/server/lucia';
import { createUserSchema, userLoginSchema } from './../../utils/schema/userSchema';
import { createTRPCRouter, publicProcedure } from './../t';
import { LuciaError } from 'lucia-auth';

export const userRouter = createTRPCRouter({
	userRegistration: publicProcedure.input(createUserSchema).mutation(async ({ input }) => {
		const { name, email, password, username } = input;
		try {
			return await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email,
					password
				},
				attributes: {
					name,
					email,
					username
				}
			});
		} catch (e) {
			const error = e as Error;
			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'Email address its already in use'
				});
			}
		}
	}),
	loginUser: publicProcedure.input(userLoginSchema).mutation(async ({ input }) => {
		const { email, password } = input;
		try {
			const key = await auth.validateKeyPassword('email', email, password);
			return await auth.createSession(key.userId);
		} catch (e) {
			const error = e as Error;
			if (
				(error instanceof LuciaError && error.message === 'AUTH_INVALID_KEY_ID') ||
				error.message === 'AUTH_INVALID_PASSWORD'
			) {
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'Invalid credentials'
				});
			}
		}
	})
});
