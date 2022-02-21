import { PrismaClient } from "@prisma/client";
import * as bcrypt  from "bcrypt";
const prisma = new PrismaClient();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {
  const reqbody = await request.json();
  const hash = await bcrypt.hash(reqbody.password, 10);
  const user = {
    email: reqbody.email,
    nom: reqbody.nom,
    prenom: reqbody.prenom,
    passhash: hash
  }
  console.log(user);
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
};