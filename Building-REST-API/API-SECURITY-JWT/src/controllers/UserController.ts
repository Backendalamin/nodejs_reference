import { NextFunction, Request, Response } from 'express';
import { getAllUsers, Roles, getUser, createUser, updateUser, deleteUser } from '../state/user';
import { ForbiddenError } from '../exceptions/forbiddenError';
import { ClientError } from '../exceptions/clientError';
import { CustomRequest } from '../middleware/checkJwt';

/*class UserController {
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        // Retrieve all users.
        const users = getAllUsers();
        // Return the user information.
        res.status(200).type('json').send(users);
    };
    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        // Get the ID from the URL.
        const id: string = req.params.id;
        // Get the user with the requested ID.
        const user = getUser(id);
        // NOTE: We will only get here if we found a user with the requested ID.
        res.status(200).type('json').send(user);
    };
    static newUser = async (req: Request, res: Response, next: NextFunction) => {
        // Get the username and password.
        let { username, password } = req.body;
        // We can only create regular users through this function.
        const user = await createUser(username, password, Roles.USER);
        // NOTE: We will only get here if all new user information 
        // is valid and the user was created.
        // Send an HTTP "Created" response.
        res.status(201).type('json').send(user);
    };
    static editUser = async (req: Request, res: Response, next: NextFunction) => {
        // Get the user ID.
        const id = req.params.id;
        // Get values from the body.
        const { username, role } = req.body;
        if (!Object.values(Roles).includes(role))
            throw new ClientError('Invalid role');
        // Retrieve and update the user record.
        const user = getUser(id);
        const updatedUser = updateUser(id, username || user.username, role || user.role);
        // NOTE: We will only get here if all new user information 
        // is valid and the user was updated.
        // Send an HTTP "No Content" response.
        res.status(204).type('json').send(updatedUser);
    };
    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        // Get the ID from the URL.
        const id = req.params.id;
        deleteUser(id);
        // NOTE: We will only get here if we found a user with the requested ID and    
        // deleted it.
        // Send an HTTP "No Content" response.
        res.status(204).type('json').send();
    };
}
export default UserController;*/

//To add extra validations to our endpoints’ implementation in order to define the data each user can access and/or modify

class UserController {
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        // Retrieve all users.
        const users = getAllUsers();
        // Return the user information.
        res.status(200).type('json').send(users);
    };
    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        // Get the ID from the URL.
        const id: string = req.params.id;
        // New code: Restrict USER requestors to retrieve their own record.
        // Allow ADMIN requestors to retrieve any record.
        if ((req as CustomRequest).token.payload.role === Roles.USER && req.params.id !== (req as CustomRequest).token.payload.userId) {
            throw new ForbiddenError('Not enough permissions');
        }
        // Get the user with the requested ID.
        const user = getUser(id);
        // NOTE: We will only get here if we found a user with the requested ID.
        res.status(200).type('json').send(user);
    };
    static newUser = async (req: Request, res: Response, next: NextFunction) => {
        // NOTE: No change to this function.
        // Get the user name and password.
        let { username, password } = req.body;
        // We can only create regular users through this function.
        const user = await createUser(username, password, Roles.USER);
        // NOTE: We will only get here if all new user information 
        // is valid and the user was created.
        // Send an HTTP "Created" response.
        res.status(201).type('json').send(user);
    };
    static editUser = async (req: Request, res: Response, next: NextFunction) => {
        // Get the user ID.
        const id = req.params.id;
        // New code: Restrict USER requestors to edit their own record.
        // Allow ADMIN requestors to edit any record.
        if ((req as CustomRequest).token.payload.role === Roles.USER && req.params.id !== (req as CustomRequest).token.payload.userId) {
            throw new ForbiddenError('Not enough permissions');
        }
        // Get values from the body.
        const { username, role } = req.body;
        // New code: Do not allow USERs to change themselves to an ADMIN.
        // Verify you cannot make yourself an ADMIN if you are a USER.
        if ((req as CustomRequest).token.payload.role === Roles.USER && role === Roles.ADMIN) {
            throw new ForbiddenError('Not enough permissions');
        }
        // Verify the role is correct.
        else if (!Object.values(Roles).includes(role)) 
             throw new ClientError('Invalid role');
        // Retrieve and update the user record.
        const user = getUser(id);
        const updatedUser = updateUser(id, username || user.username, role || user.role);
        // NOTE: We will only get here if all new user information 
        // is valid and the user was updated.
        // Send an HTTP "No Content" response.
        res.status(204).type('json').send(updatedUser);
    };
    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        // NOTE: No change to this function.
        // Get the ID from the URL.
        const id = req.params.id;
        deleteUser(id);
        // NOTE: We will only get here if we found a user with the requested ID and    
        // deleted it.
        // Send an HTTP "No Content" response.
        res.status(204).type('json').send();
    };
}
export default UserController;