import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, params }) {
	const sections = await prisma.section.findMany({
		select: {
			id: true,
			name: true
		},
		orderBy: { 
			order: "desc" 
		}
	});
	return {
		body: sections,
		status: 200
	};
}
