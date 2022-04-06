import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, params }) {
	var pic = await prisma.picture.findFirst({ 
		where: { id: 1*params.id }
	});
	if (pic) {
		return {
			body: { pic },
			status: 200
		}
	}
  return {
    status: 404
  };
}