import cookie from 'cookie';
import { PrismaClient } from "@prisma/client";
import type { RequestEvent } from '@sveltejs/kit';
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

export async function getContext({ request }) {
	const cookies = cookie.parse(request.headers.get('cookie') || '');
	if(!cookies.token) 
		return {
			user : null
		};

	const token = cookies.token;
	if(token) {
		const user = await prisma.user.findUnique({
			where : {token} 
		})
		return { user };
	}
	return {
		user : null
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession( event: RequestEvent ) {
	const user = (await getContext(event)).user;
	if(user){
		delete user.token;
		delete user.passhash;
	}
	return { user }	
}
 