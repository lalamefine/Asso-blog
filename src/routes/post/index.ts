import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {
	const post = await request.json();

	// Créer la section si innexistante
	if(await prisma.section.count({ where: { name: post.sectionName } }) == 0 )
		return prisma.section.create({ data: { name: post.sectionName }});

	const item = await prisma.post.create({data: post});

	if (item) {
		return {
			body: { ...item }
		};
	}

	return {
		status: 404
	};
}
