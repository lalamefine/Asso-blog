import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
import {controlAccess, getUser} from '$lib/account/ControlAccess';
const prisma = new PrismaClient();

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

	const post = await request.json();

	// Créer la section si inexistante
	if(await prisma.section.count({ where: { name: post.sectionName } }) == 0 ){
		var section = await prisma.section.create({ data: { name: post.sectionName }});
	}

	// Sauvegarder les Pictures
	const pictures = post.pictures;
	delete post.pictures;

	const saved_post = await prisma.post.create({data: post});

	//Enregistrer les Pictures qui ne sont pas déjà enregistrées
	for (let i = 0; i < pictures.length; i++) {
		if (!pictures[i].id) {
			pictures[i].postId = saved_post.id;
			await prisma.picture.create({ data: pictures[i] });
		}
	}
	
	if (saved_post) {
		return {
			body: { ...saved_post }
		};
	}

	return {
		status: 404
	};
}
