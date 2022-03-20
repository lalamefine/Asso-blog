import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {
	const reqbody = await request.json();
	const section = {
		name: reqbody.name
	};
	console.log('Création section ', section);
	const item = await prisma.section.create({
		data: section
	});

	if (item) {
		return {
			body: { item }
		};
	}

	return {
		status: 404
	};
}
