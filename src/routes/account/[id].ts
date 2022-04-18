import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {
	console.log(request.body);
	return {
		body: null,
		status: 404
	};
}
