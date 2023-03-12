import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';
import { dev } from '$app/environment';
export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData) => {
		return {
			userId: userData.id,
			email: userData.email,
			name: userData.name,
			username: userData.username
		};
	}
});

export type Auth = typeof auth;
