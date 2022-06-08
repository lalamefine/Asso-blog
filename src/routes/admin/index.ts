import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, params }) {
	const sections = await prisma.section.findMany({
    include: { 
      posts: {
        include: {
          author: true,
        }
      }
    }
  });
	return {
		body: {sections},
		status: 200
	};
}