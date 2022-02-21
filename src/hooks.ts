import cookie from 'cookie';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const token = cookies.token;
	if(token) {
		const user = await prisma.user.findUnique({
			where : {token} 
		})
		event.locals.user = user;
	}
	const response = await resolve(event);

	console.log("REQ     -> ", event.request.method , event.request.url);
	console.log("COOKIES -> ", cookie.parse(event.request.headers.get('cookie') || ''));
	return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(event) {
	if (event.locals.user) 
		return { user: event.locals.user };
	else
		return {};
}
 