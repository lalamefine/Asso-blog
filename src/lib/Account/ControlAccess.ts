import PrismaObj from '@prisma/client'
const { PrismaClient } = PrismaObj
var prisma = new PrismaClient();
import cookie from 'cookie';

export function controlAccess( user, required ) {
    if(!user) 
      return false;

    if(user.privilege === 'Administrateur') 
      return true;

    if(user.privilege === 'Rédacteur' && required === 'Rédacteur') 
      return true;

    return false;
}

export function getUser( request ) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  if(!cookies.token)
    return null;

  const token = cookies.token;
  if(token) {
    const user = prisma.user.findUnique({
      where: { token }
    });
    return user;
  }
  return null;
}