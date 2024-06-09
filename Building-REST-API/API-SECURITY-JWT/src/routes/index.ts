import { Router } from "express";
import auth from "./auth";
import user from "./user";

/*const routes = Router();
//All user operations will be available under the "users" route prefix
routes.use("/users", user);

//Allow our router to be used outised of the file
export default routes;*/

const routes = Router();
// All auth operations will be available under the "auth" route prefix.
routes.use("/auth", auth);
// All user operations will be available under the "users" route prefix.
routes.use("/users", user);
// Allow our router to be used outside of this file.
export default routes;
