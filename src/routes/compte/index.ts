import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, params }) {
	const users = await prisma.user.findMany();
	return {
		body: {users},
		status: 200
	};
}