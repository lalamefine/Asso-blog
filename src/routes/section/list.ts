import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, params }) {
	const sections = await prisma.section.findMany({
		select: {
			id: true,
			name: true
		}
	});
	return {
		body: sections,
		status: 200
	};
}
