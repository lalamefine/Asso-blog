import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {
	const user = await request.json();
	// console.log(1*params.id + " -> ", user);
	const saved_user = await prisma.user.update({where: {id: 1*params.id}, data: user});
	if (saved_user)
		return {
			body: { ...saved_user }
		};
	else
		return {
			error: "User not found",
			status: 404
		};

}
