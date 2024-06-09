import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from './checkJwt';
import { getUser, Roles } from '../state/user';

export const checkRole = (roles: Array<Roles>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Find the user with the requested ID.
        const user = getUser((req as CustomRequest).token.payload.userId);
        // Ensure we found a user.
        if (!user) {
            res.status(404)
                .type('json')
                .send(JSON.stringify({ message: 'User not found' }));
            return;
        }
        // Ensure the user's role is contained in the authorized roles.
        if (roles.indexOf(user.role) > -1) next();
        else {
            res.status(403)
                .type('json')
                .send(JSON.stringify({ message: 'Not enough permissions' }));
            return;
        }
    };
};
/*
Note that we retrieve the user’s role as stored on the server,
 instead of the role contained in the JWT. This allows a previously 
 authenticated user to have their permissions changed midstream within 
 their authentication session. Authorization to a route will be correct, 
 regardless of the authorization information that is stored within the JWT.

*/