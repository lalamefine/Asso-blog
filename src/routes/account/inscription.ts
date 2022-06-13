import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {
	const reqbody = await request.json();
	const hash = await bcrypt.hash(reqbody.password, 10);
	const user = {
		email: reqbody.email,
		nom: reqbody.nom,
		prenom: reqbody.prenom,
		passhash: hash,
		privilege: "Aucun"
	};
	if(await prisma.user.count() == 0)
		user.privilege = 'Administrateur'

	const item = await prisma.user.create({
		data: user
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
