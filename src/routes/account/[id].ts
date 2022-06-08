import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
import {controlAccess, getUser} from '$lib/account/ControlAccess';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {

	// Check can edit
	const user = await getUser(request);
	if (!user) {
		return {
			status: 401
		};
	}else if(!controlAccess(user, 'Rédacteur')) {
		return {
			status: 403
		};
	}

	const targetuser = await request.json();
	// console.log(1*params.id + " -> ", user);
	const saved_user = await prisma.user.update({where: {id: 1*params.id}, data: targetuser});
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
