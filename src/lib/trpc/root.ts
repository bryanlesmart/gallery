import { articleRouter } from './router/article';
import { userRouter } from './router/user';
import { exampleRouter } from './router/example';
import { createTRPCRouter } from './t';

export const router = createTRPCRouter({
	example: exampleRouter,
	user: userRouter,
	article: articleRouter
});

export type AppRouter = typeof router;
