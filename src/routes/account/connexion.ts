import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
import cookie from 'cookie';

var rand = function () {
	return Math.random().toString(36).substring(2); // remove `0.`
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {
	const reqbody = await request.json();
	var item = await prisma.user.findUnique({
		where: {
			email: reqbody.email
		}
	});

	if (item) {
		const token = item.id + '.' + rand();
		item = await prisma.user.update({
			where: {
				id: item.id
			},
			data: {
				token: token
			}
		});
		if (item) {
			delete item.token;
			delete item.passhash;
		}
		return {
			headers: {
				'set-cookie': cookie.serialize('token', token, { path: '/' })
			},
			body: { item }
		};
	}

	return {
		status: 404
	};
}
