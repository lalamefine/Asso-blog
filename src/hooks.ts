import type { RequestEvent } from '@sveltejs/kit/types/internal';
import {controlAccess, getUser} from '$lib/account/ControlAccess';


export const handle = async ({ event,  resolve  }) => {
	const user = await getUser(event.request);

 	// Poursuite de l'exécution
	const response = await resolve(event);

	return response;
};

export async function getContext({ request }) {
	return {user: await getUser(request)};
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(event: RequestEvent) {
	const user = (await getContext(event)).user;
	if (user) {
		delete user.token;
		delete user.passhash;
	}
	return { user };
}
