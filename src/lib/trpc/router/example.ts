import { createTRPCRouter, publicProcedure } from './../t';

export const exampleRouter = createTRPCRouter({
	greeting: publicProcedure.query(async () => {
		return 'Hello world';
	})
});
