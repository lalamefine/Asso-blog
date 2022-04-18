import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, params }) {
	var post = await prisma.post.findFirst({ 
		where: { id: 1*params.id },
		include: {
			pictures: true,
		},
	});
	if (post) {
		return {
			body: { post },
			status: 200
		}
	}
  return {
    status: 404
  };
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {
	const post = await request.json();

	// Créer la section si innexistante
	if(await prisma.section.count({ where: { name: post.sectionName } }) == 0 ){
		if (post.sectionName.length > 0) 
		prisma.section.create({ data: { name: post.sectionName }});
	}

	// Sauvegarder les Pictures
	const pictures = post.pictures;
	delete post.pictures;

	const saved_post = await prisma.post.update({
		where: { id: 1*params.id },
		data: post
	});

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

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function del({ request, params }) {
	var post = await prisma.post.delete({ where: { id: 1*params.id }});
	if (post) {
		var postsInSection = await prisma.post.findMany({ where: { sectionName: post.sectionName }});
		if(postsInSection.length == 0) {
			var section = await prisma.section.delete({ where: { name: post.sectionName }});
		}
		return {
			body: { post },
			status: 200
		}
	}
  return {
    status: 400
  };
}
