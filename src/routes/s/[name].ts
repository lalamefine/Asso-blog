import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, params }) {
	var section = await prisma.section.findFirst({ 
		where: { name: params.name },
		include: {
			posts: {
				include: {
					pictures: true,
				}
			},
		}
	});
	section
	if (section) {
		return {
			body: { section },
			status: 200
		}
	}
  return {
    status: 404
  };
}
